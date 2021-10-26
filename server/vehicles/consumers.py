from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from vehicles.models import Vehicle
from vehicles.serializers import VehicleSerializer
from .data import  A3

import logging

logger = logging.getLogger(__name__)

road = A3

class VehicleConsumer(AsyncJsonWebsocketConsumer):
    CONNECTED = False

    @database_sync_to_async
    def _get_vehicle_data(self):
        # data = Vehicle.objects.all()
        serializer = VehicleSerializer(Vehicle.objects.all(), many=True)
        return serializer.data
    
    async def get_vehicles(self):
        return await self._get_vehicle_data()
    
    async def connect(self):
        # Logic after connection
        logger.critical(" ==== Web socket connected ====")
        await self.channel_layer.group_add(
            'vehicles', self.channel_name
        )
        await self.accept()
        
    async def send_locations(self, event):
        logger.critical(" ==== Sending message ====")
        await self.send_json({
            'location': event["location"],
            'vehicle': event['vehicle'],
            'driver': event['driver']
        })
        
    async def disconnect(self):
        logger.critical(" ==== Web Socket Disconnected ====")
        await self.channel_layer.group_discard(
            'vehicles', self.channel_name
        )

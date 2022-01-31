from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from vehicles.models import Vehicle
from vehicles.serializers import VehicleSerializer
from speed_limit_violations.serializers import SpeedViolationSerializer
from speed_limit_violations.models import SpeedViolation
from speed_limit.models import SpeedLimit
from drivers.models import Driver
from tracker_devices.models import Tracker

import logging

logger = logging.getLogger(__name__)


class VehicleConsumer(AsyncJsonWebsocketConsumer):
    CONNECTED = False

    @database_sync_to_async
    def _get_vehicle_data(self):
        # data = Vehicle.objects.all()
        serializer = VehicleSerializer(Vehicle.objects.all(), many=True)
        return serializer.data
    
    @database_sync_to_async
    def _save_speed_violation(self, data):
        speed_violation_obj = {}
        speed_violation_obj['speed_limit_section'] = SpeedLimit.objects.get(section_name__iexact=data.get('section_name'))
        speed_violation_obj['driver'] = Driver.objects.get(rfid=data.get('rfid'))
        speed_violation_obj['vehicle'] = Vehicle.objects.get(plate=data.get('plate'))
        speed_violation_obj['tracker'] = Tracker.objects.get(imei=data.get('imei'))
        speed_violation_obj['speed'] = data.get('speed')
        serializer = SpeedViolationSerializer(data=speed_violation_obj)
        serializer.is_valid(raise_exception=True)
        logger.critical(" ==== Speed limit violation saved  ====")
        speed_limit_violation = SpeedViolation(**speed_violation_obj)
        speed_limit_violation.save()
        
    
    async def get_vehicles(self):
        return await self._get_vehicle_data()
    
    async def connect(self):
        # Logic after connection
        logger.critical(" ==== Web socket connected ====")
        # Join vehicle room group
        await self.channel_layer.group_add(
            'vehicles', self.channel_name
        )
        await self.accept()
        
    async def send_locations(self, event):
        logger.critical(" ==== Sending message to client ====")
        await self.send_json({
            'location': event["location"],
            'vehicle': event['vehicle'],
            'driver': event['driver'],
        })
        
    async def disconnect(self, close_code):
        logger.critical(" ==== Web Socket Disconnected ====")
        # Leave vehicles group
        await self.channel_layer.group_discard(
            'vehicles', self.channel_name
        )
        
    # Receive message from web socket
    async def receive_json(self, content, **kwargs):
        print("=================== MESSAGE RECEIVED FROM CLIENT ===================")
        print(content)
        print("=================== MESSAGE END ====================================")
        message_type = content.get('type')
        data = {}
        data['speed'] = content.get('speed')
        data['plate'] = content.get('vehicle', {}).get('plate')
        data['rfid'] = content.get('driver', {}).get('rfid')
        data['imei'] = content.get('vehicle', {}).get('imei')
        data['section_name'] = content.get('section', {}).get('name')
        
        if message_type == 'add.speed.violation':
            await self._save_speed_violation(data)
        

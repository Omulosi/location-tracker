from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import asyncio

from vehicles.models import Vehicle
from vehicles.serializers import VehicleSerializer

import logging

logger = logging.getLogger(__name__)


class VehicleConsumer(AsyncJsonWebsocketConsumer):
    CONNECTED = False
    
    
    @database_sync_to_async
    def _create_speed_limit(self, data):
        # serializer = TripSerializer(data=data)
        # serializer.is_valid(raise_exception=True)
        # return serializer.create(serializer.validated_data)
        pass

    @database_sync_to_async
    def _get_vehicle_data(self, vehicle):
        return VehicleSerializer(vehicle).data

    @database_sync_to_async
    def _get_vehicle_ids(self, user):
        # user_groups = user.groups.values_list('name', flat=True)
        # if 'driver' in user_groups:
        #     trip_ids = user.trips_as_driver.exclude(
        #         status=Trip.COMPLETED
        #     ).only('id').values_list('id', flat=True)
        # else:
        #     trip_ids = user.trips_as_rider.exclude(
        #         status=Trip.COMPLETED
        #     ).only('id').values_list('id', flat=True)
        # return map(str, trip_ids)
        pass

    @database_sync_to_async
    def _update_speed_limit(self, data):
        # instance = Trip.objects.get(id=data.get('id'))
        # serializer = TripSerializer(data=data)
        # serializer.is_valid(raise_exception=True)
        # return serializer.update(instance, serializer.validated_data)
        pass

    async def connect(self):
        # Logic after connection
        logger.critical(" ==== Web socket connected ====")
        await self.accept()
        CONNECTED = True
        while CONNECTED:
            obj = [37.2, 1.2]
            await self.send_json({
                'type': 'websocket.send',
                'data': obj
            })
            await asyncio.sleep(2)

    async def receive_json(self, content, **kwargs):
        message_type = content.get('type')
        if message_type == 'create.speed_limit':
            await self.create_s(content)
        elif message_type == 'update.speed_limit':
            await self.update_trip(content)

    async def create_speed_limit(self, message):
        data = message.get('data')
        speed_limit = await self._create_speed_limit(data)
        trip_data = await self._get_trip_data({'data': ''})

        # Send limit back to all maps
        # await self.channel_layer.group_send(group='drivers', message={
        #     'type': 'echo.message',
        #     'data': trip_data
        # })

        # await self.send_json({
        #     'type': 'echo.message',
        #     'data': trip_data,
        # })

    async def update_speed_limit(self, message):
        data = message.get('data')
        speed_limit = await self._update_speed_limit(data)
        # Send update to map.

        await self.send_json({
            'type': 'echo.message',
            'data': {'data': ''}
        })

    async def disconnect(self, code):
        logger.critical(" ==== Web Socket Disconnected ====")
        CONNECTED = False
        await super().disconnect(code)

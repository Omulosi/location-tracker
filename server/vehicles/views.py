from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from urllib.parse import parse_qs
from datetime import datetime
from django.utils import timezone
from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework import status

from .serializers import VehicleSerializer
from .models import Vehicle
from drivers.models import Driver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

channel_layer  = get_channel_layer()

class VehicleListCreate(mixins.ListModelMixin, generics.GenericAPIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    
    def post(self, request, *args, **kwargs):
        query_string = request.META['QUERY_STRING']
        data = parse_qs(query_string)
        vehicle_properties = ['plate']
        location_properties = ['lon', 'lat', 'speed', 'timestamp', 'altitude', 'course']
        driver_properties = ['rfid']
        tracker_properties = ['imei']
        vehicle_data = { k : v if len(v) > 1 else v[0] for k, v in data.items() if k in vehicle_properties }
        vehicle_data['plate'] = vehicle_data.get('plate', '').replace("'", "") # Remove quotes around plate number
        location_data = { k : v if len(v) > 1 else v[0] for k, v in data.items() if k in location_properties }
        driver_data = { k : v if len(v) > 1 else v[0] for k, v in data.items() if k in driver_properties }
        tracker_data = { k : v if len(v) > 1 else v[0] for k, v in data.items() if k in tracker_properties }
        
        timestamp = timezone.now()
        if location_data.get('timestamp'):
            timestamp = datetime.strptime(location_data.get('timestamp').strip(), "%m/%d/%Y %H:%M:%S")
        # location_data['timestamp'] = timestamp
        
        try:
            vehicle = Vehicle.objects.get(plate=vehicle_data.get('plate'))
            driver = Driver.objects.get(rfid=driver_data.get('rfid'))
            
        except Vehicle.DoesNotExist:
            vehicle = None
        except Driver.DoesNotExist:
            driver = None
            
        if vehicle and driver:
            # vehicle.location.create(**location_data)
            # print("======================================================== Driver Data => ", driver_data)
            # print('======================================================== Tracker Data =>', tracker_data)
            driver_data['name'] = f'{driver.name} - {driver.id_number}'
            vehicle_data['imei'] = tracker_data.get('imei')
            
            # Save location
            # location = Location(**location_data, vehicle=vehicle)
            # location.save()
            
            # send this event over the channel layer to be
            # handled by the consumer
            async_to_sync(channel_layer.group_send)('vehicles', {
                'type': 'send_locations',
                'location': location_data,
                'vehicle': vehicle_data,
                'driver': driver_data,   
            })
            return Response(status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    
    
class VehicleDetail(generics.RetrieveDestroyAPIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    
    
    
    
# @csrf_exempt
# def vehicle_view(request):
    
#     if request.method == 'POST':
#         query_string = request.META['QUERY_STRING']
#         data = parse_qs(query_string)
#         vehicle_properties = ['plate']
#         location_properties = ['lon', 'lat', 'speed', 'timestamp', 'altitude', 'course']
#         driver_properties = ['rfid']
#         tracker_properties = ['imei']
#         vehicle_data = { k : v if len(v) > 1 else v[0] for k, v in data.items() if k in vehicle_properties }
#         vehicle_data['plate'] = vehicle_data.get('plate', '').replace("'", "") # Remove quotes around plate number
#         location_data = { k : v if len(v) > 1 else v[0] for k, v in data.items() if k in location_properties }
#         driver_data = { k : v if len(v) > 1 else v[0] for k, v in data.items() if k in driver_properties }
       
#         timestamp = timezone.now()
#         if location_data.get('timestamp'):
#             timestamp = datetime.strptime(location_data.get('timestamp').strip(), "%m/%d/%Y %H:%M:%S")
#         # location_data['timestamp'] = timestamp
        
#         try:
#             vehicle = Vehicle.objects.get(plate=vehicle_data.get('plate'))
#             driver = Driver.objects.get(rfid=driver_data.get('rfid'))
#         except Vehicle.DoesNotExist:
#             vehicle = None
#         except Driver.DoesNotExist:
#             driver = None
#         if vehicle and driver:
#             # vehicle.location.create(**location_data)
#             # print("======================================================== Location => ", location_data)
#             # print("======================================================== Driver => ", driver_data)
#             driver_data['name'] = f'{driver.name} - {driver.id_number}'
            
#             # Save location
#             # location = Location(**location_data, vehicle=vehicle)
#             # location.save()
            
#             # send this event over the channel layer to be
#             # handled by the consumer
#             async_to_sync(channel_layer.group_send)('vehicles', {
#                 'type': 'send_locations',
#                 'location': location_data,
#                 'vehicle': vehicle_data,
#                 'tracker': tracker_data,
#                 'driver': driver_data
                
#             })
        
#             return JsonResponse({'message': 'success'})
        
#     return JsonResponse({"message": "Error"})
    
    
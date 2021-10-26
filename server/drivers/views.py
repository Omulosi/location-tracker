from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import DriverSerializer
from .models import Driver

class DriverListCreate(generics.ListCreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    

class DriverDetail(generics.RetrieveDestroyAPIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

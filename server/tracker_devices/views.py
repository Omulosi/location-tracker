from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import TrackerSerializer

class TrackerListCreate(generics.ListCreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = TrackerSerializer

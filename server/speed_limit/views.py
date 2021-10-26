from django.contrib.gis.geos.linestring import LineString
from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework import status
from .serializers import SpeedLimitSerializer
from .models import SpeedLimit

class SpeedLimitListCreate(mixins.ListModelMixin, generics.GenericAPIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = SpeedLimit.objects.all()
    serializer_class = SpeedLimitSerializer
    
    def post(self, request, *args, **kwargs):
        section = request.data.get('geom')
        section_name = request.data.get('section_name')
        speed_limit = request.data.get('speed_limit')
        geom = LineString(*section)
        data = SpeedLimit(section_name=section_name, speed_limit=speed_limit, geom=geom)
        data.save()
        return Response(status=status.HTTP_200_OK)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    
    
class SpeedLimitDetail(generics.RetrieveDestroyAPIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = SpeedLimit.objects.all()
    serializer_class = SpeedLimitSerializer
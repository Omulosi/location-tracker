from  rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from django.contrib.gis.geos import LineString
from .models import SpeedLimit


class SpeedLimitSerializer(GeoFeatureModelSerializer):
    
    class Meta:
        model = SpeedLimit
        geo_field = 'geom'
        fields = '__all__'
        


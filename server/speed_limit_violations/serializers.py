from  rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from .models import SpeedViolation


class SpeedViolationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SpeedViolation
        fields = '__all__'
        depth = 2
        
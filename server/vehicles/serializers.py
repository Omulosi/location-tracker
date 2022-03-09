from rest_framework import serializers

from .models import Vehicle, MonitoringData


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'
        
        
class MonitoringDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonitoringData
        fields = '__all__'
        
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        representation['total_received'] =  1 if instance.time_received_from_tracker else 0
        representation['total_sent'] = 1 if instance.time_sent_to_display else 0
        
        return representation

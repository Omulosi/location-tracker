import uuid
from django.db import models
    
class Vehicle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # imei = models.CharField(max_length=100, default='')
    model = models.CharField(max_length=100, default='')
    plate = models.CharField(max_length=100, default='')

    def __str__(self):
        return f'{self.model} - {self.plate}'
    
class Location(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    speed = models.DecimalField(max_digits=10, decimal_places=4, default=0.0)
    lat = models.DecimalField(max_digits=10, decimal_places=4, default=0.0)
    lon = models.DecimalField(max_digits=10, decimal_places=4, default=0.0)
    course = models.DecimalField(max_digits=6, decimal_places=4, default=0.0)
    timestamp = models.DateTimeField()
    altitude = models.DecimalField(max_digits=10, decimal_places=3, default=0.0)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='location')

    def __str__(self):
        return f'Lat: {self.lat}, Lon: {self.lon}'


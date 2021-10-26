import uuid
from django.db import models
    
class Driver(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='')
    rfid = models.CharField(max_length=100, default='')
    id_number = models.CharField(max_length=100, default='')

    def __str__(self):
        return f'{self.name} - {self.rfid}'
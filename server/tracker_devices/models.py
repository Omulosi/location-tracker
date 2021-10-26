import uuid
from django.db import models
    
class Tracker(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    imei = models.CharField(max_length=100, default='')

    def __str__(self):
        return f'{self.imei}'

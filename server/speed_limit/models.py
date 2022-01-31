from django.contrib.gis.db import models as gis_models
from  django.db import models


class SpeedLimit(models.Model):
    section_name = models.CharField(max_length=500, blank=True, null=True)
    speed_limit = models.DecimalField(blank=True, null=True, decimal_places=2, max_digits=6)
    geom = gis_models.LineStringField(srid=4326, null=True)
    
    def __str__(self):
        return f'{self.section_name} - {self.speed_limit}'
from django.contrib.gis.db import models as gis_models
from  django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from speed_limit.models import SpeedLimit
from drivers.models import Driver
from vehicles.models import Vehicle
from tracker_devices.models import Tracker


class SpeedViolation(models.Model):
    speed_limit_section = models.ForeignKey(SpeedLimit, blank=True, null=True, on_delete=models.SET_NULL)
    driver = models.ForeignKey(Driver, blank=True, null=True, on_delete=models.SET_NULL)
    vehicle = models.ForeignKey(Vehicle, blank=True, null=True, on_delete=models.SET_NULL)
    tracker = models.ForeignKey(Tracker, blank=True, null=True, on_delete=models.SET_NULL)
    speed = models.DecimalField(blank=True, null=True, decimal_places=2, max_digits=6)
    date = models.DateTimeField(blank=True, null=True, verbose_name=_("date"))
    
    def save(self, *args, **kwargs):
        self.date = timezone.now()
        return super(SpeedViolation, self).save(*args, **kwargs)
    
    def __str__(self):
        return f'{self.driver} - {self.date}'

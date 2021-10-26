from django.contrib.gis import admin
from .models import SpeedViolation

@admin.register(SpeedViolation)
class SpeedViolationAdmin(admin.OSMGeoAdmin):
    pass

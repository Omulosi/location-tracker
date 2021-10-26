from django.contrib.gis import admin
from .models import SpeedLimit

@admin.register(SpeedLimit)
class SpeedLimitAdmin(admin.OSMGeoAdmin):
    pass

from django.contrib.gis import admin
from .models import SpeedViolation

@admin.register(SpeedViolation)
class SpeedViolationAdmin(admin.OSMGeoAdmin):
    
    def has_change_permission(self, request, obj=None):
        return False

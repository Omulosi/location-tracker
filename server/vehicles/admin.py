from django.contrib import admin
from .models import Vehicle, Location

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    pass

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass
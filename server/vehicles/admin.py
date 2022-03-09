from django.contrib import admin
from .models import Vehicle, MonitoringData

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    pass


@admin.register(MonitoringData)
class MonitoringDataAdmin(admin.ModelAdmin):
    list_display = ("id", "time_received_from_tracker", "time_sent_to_display",)
    ordering = ("time_received_from_tracker", "time_sent_to_display")
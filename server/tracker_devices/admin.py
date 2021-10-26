from django.contrib import admin
from .models import Tracker

@admin.register(Tracker)
class TrackerDevices(admin.ModelAdmin):
    pass
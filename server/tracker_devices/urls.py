from django.urls import path
from .views import TrackerListCreate

urlpatterns = [
    path("", TrackerListCreate.as_view(), name="tracker_list_create"),
]
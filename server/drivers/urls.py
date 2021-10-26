from django.urls import path
from .views import DriverDetail, DriverListCreate

urlpatterns = [
    path("", DriverListCreate.as_view(), name="driver_list_create"),
    path("<pk>", DriverDetail.as_view(), name="driver_detail"),
]
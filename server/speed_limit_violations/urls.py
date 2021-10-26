from django.urls import path
from .views import SpeedViolationListCreate, SpeedViolationDetail

urlpatterns = [
    path("", SpeedViolationListCreate.as_view(), name="speed_violation_list_create"),
    path("<pk>/", SpeedViolationDetail.as_view(), name="speed_violation_detail")
]
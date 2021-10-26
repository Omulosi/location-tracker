from django.urls import path
from .views import SpeedLimitListCreate, SpeedLimitDetail

urlpatterns = [
    path("", SpeedLimitListCreate.as_view(), name="speed_limit_list_create"),
    path("<pk>/", SpeedLimitDetail.as_view(), name="speed_limit_detail")
]
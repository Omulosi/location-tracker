from django.urls import path
from vehicles import views

app_name = 'vehicles'

urlpatterns = [
    # path('', views.vehicle_view, name='index'),
    path('', views.VehicleListCreate.as_view(), name='vehicle-list'),
    path('<pk>', views.VehicleDetail.as_view(), name='vehicle-detail'),
]

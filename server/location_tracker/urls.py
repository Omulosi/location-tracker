"""location_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# AT+HTTPPARA="URL","https://msc-project.onb.co.ke/tracker?imei=86183939982&rfid=146272&lat=-1.33415&lon=36.88616&timestamp=10/31/2019 08:25:32 &altitude=1635.6&course=87.87&speed= 90&plate='KAT 256G'"

urlpatterns = [
    path('admin/', admin.site.urls),
    # Accessed by remote tracker
    path('tracker/', include('vehicles.urls')),
    # Authentication URLs
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('drivers/', include('drivers.urls')),
    # Accessed by frontend UI
    path('vehicles/', include('vehicles.urls')),
    path('tracker_devices/', include('tracker_devices.urls')),
    path('speed_limits/', include('speed_limit.urls')),
]

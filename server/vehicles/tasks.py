import requests
from celery import shared_task


@shared_task
def get_location():
    """Mimics sending location data by a vehicle
    """
    url = "http://localhost/tracker/?imei=86183939982&rfid=146272&lat=-1.33415&lon=36.88616&timestamp=10/31/2019 08:25:32 &altitude=1635.6&course=87.87&speed= 90&plate='KAT 256G'"
    response = requests.post(url).json()
    print(response)
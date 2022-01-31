# import os

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'location_tracker.settings')

# application = get_asgi_application()

import os
# from django.core.asgi import get_asgi_application
import django
from channels.routing import get_default_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'location_tracker.settings')
django.setup()
application = get_default_application()

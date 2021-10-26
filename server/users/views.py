from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.response import Response
import logging
from .models import User

from .serializers import (
    UserSerializer,
)

logger = logging.getLogger(__name__)

class UserList(generics.ListAPIView):
    queryset = get_user_model().objects.not_deleted()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.not_deleted()
    serializer_class = UserSerializer




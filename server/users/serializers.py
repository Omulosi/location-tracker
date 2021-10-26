from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    is_staff = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ("pk", "first_name", "last_name", "email", "password", "is_staff")
        extra_kwargs = {"password": {"write_only": True}}

    def get_is_staff(self, obj):
        return obj.is_staff

    def validate_email(self, value):
        norm_email = value.lower()
        if get_user_model().objects.filter(email=norm_email).exists():
            raise serializers.ValidationError("user with this email address already exists.")
        return norm_email

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

    def update(self, obj, validated_data):
        password = validated_data.pop("password", None)
        if password:
            obj.set_password(password)
        return super().update(obj, validated_data)


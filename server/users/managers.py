from django.contrib.auth.models import BaseUserManager

from .core import CoreManager, CoreModel, CoreQuerySet


class UserManager(CoreManager, BaseUserManager):
    def get_queryset(self):
        return CoreQuerySet(self.model, using=self._db)

    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError("Users must give an email address")

        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, **kwargs):
        user = self.create_user(**kwargs)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)

        return user
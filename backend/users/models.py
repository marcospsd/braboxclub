
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser, models.Model):
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


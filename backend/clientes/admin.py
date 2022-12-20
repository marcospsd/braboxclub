from atexit import register
from django.contrib import admin

from .models import Clientes

# Register your models here.


@admin.register(Clientes)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf')

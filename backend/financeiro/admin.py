from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Financiamento)
class FinanciamentoAdmin(admin.ModelAdmin):
    model = Financiamento
    list_display = ('cliente', 'venda', 'valor', 'saldo')

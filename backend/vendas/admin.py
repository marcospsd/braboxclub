from django.contrib import admin
from .models import *
# Register your models here.

class CorpoInline(admin.TabularInline):
    model = Corpo_venda
    extra = 1

class FormaInline(admin.TabularInline):
    model = Forma_Pagamento
    extra = 1


@admin.register(Vendas)
class VendaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'emissao', 'valor_total')
    inlines = [CorpoInline, FormaInline]

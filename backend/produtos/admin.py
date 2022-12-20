from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Produtos)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('descricao',)

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome',)

@admin.register(Marca)
class MarcaAdmin(admin.ModelAdmin):
    list_display = ('nome',)

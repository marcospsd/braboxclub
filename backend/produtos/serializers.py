from rest_framework import serializers

from .models import *





class ProdutosSerializer(serializers.ModelSerializer):
    categoria = serializers.CharField(source='categoria.nome')
    marca = serializers.CharField(source='marca.nome')
    tamanho = serializers.CharField(source='tamanho.tamanho')
    modelo = serializers.CharField(source='modelo.nome')
    
    class Meta:
        model = Produtos
        fields = '__all__'
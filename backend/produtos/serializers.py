from rest_framework import serializers

from .models import *





class ProdutosSerializer(serializers.ModelSerializer):
    categoria = serializers.CharField(source='categoria.nome', read_only=True)
    marca = serializers.CharField(source='marca.nome', read_only=True)
    
    class Meta:
        model = Produtos
        fields = '__all__'
from rest_framework import serializers

from .models import *

class CorpoVendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Corpo_venda
        fields = '__all__'
    
class FormaPagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forma_Pagamento
        fields = '__all__'
    
class VendaSerializer(serializers.ModelSerializer):
    corpovenda = CorpoVendaSerializer(source='corpovenda_venda', many=True)
    formapag = FormaPagamentoSerializer(source='produto_corpovenda', many=True)
    class Meta:
        model = Vendas
        fields = '__all__'
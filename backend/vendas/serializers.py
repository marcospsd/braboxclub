from rest_framework import serializers
from clientes.serializers import ClienteSerializer
from .models import *
from financeiro.models import Financiamento
from datetime import date, timedelta

class CorpoVendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Corpo_venda
        fields = '__all__'
        read_only_fields = ['venda']
    
class FormaPagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forma_Pagamento
        fields = '__all__'
        read_only_fields = ['venda']
    
class VendaSerializer(serializers.ModelSerializer):
    corpovenda = CorpoVendaSerializer(source='corpovenda_venda', many=True)
    formapag = FormaPagamentoSerializer(source='formapag_venda', many=True)
    clientedados = ClienteSerializer(source='cliente', read_only=True)
    
    
    class Meta:
        model = Vendas
        fields = '__all__'

    def create(self, validated_data):
        data1 = validated_data.pop('corpovenda_venda')
        data2 = validated_data.pop('formapag_venda')
        user = Vendas.objects.create(**validated_data)
        for produto in data1:
            Corpo_venda.objects.create(venda=user, **produto)
        for formapag in data2:
            Forma_Pagamento.objects.create(venda=user, **formapag)
            if formapag['formapag'] == 'FI':
                vencimento = date.today()
                valor_parcela = round(formapag['valor']/formapag['parcelas'])
                for parcela in range(0, formapag['parcelas']):
                    Financiamento.objects.create(cliente= validated_data['cliente'],
                                                venda=user,
                                                parcela = parcela+1,
                                                dt_emissao = date.today(),
                                                dt_vencimento = vencimento + timedelta(30),
                                                valor = valor_parcela,
                                                saldo = valor_parcela,
                                                status = 'A')
                    vencimento = vencimento + timedelta(30)
        return user
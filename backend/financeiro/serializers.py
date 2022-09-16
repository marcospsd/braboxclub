from rest_framework import serializers

from .models import *

class FinanciamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financiamento
        fields = '__all__'
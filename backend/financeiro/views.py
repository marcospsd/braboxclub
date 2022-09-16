from .serializers import FinanciamentoSerializer
from rest_framework import viewsets
from .models import *

class FinanciamentoView(viewsets.ModelViewSet):
    queryset = Financiamento.objects.all()
    serializer_class = FinanciamentoSerializer
    
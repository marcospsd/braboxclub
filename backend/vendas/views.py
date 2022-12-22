from .serializers import VendaSerializer, ResumoSerializer
from rest_framework import viewsets, generics
from .models import *


class VendasView(viewsets.ModelViewSet):
    queryset = Vendas.objects.all().order_by('-emissao')
    serializer_class = VendaSerializer

class ResumoView(generics.ListAPIView):
    queryset = Vendas.objects.all()
    serializer_class = ResumoSerializer

    def get_queryset(self):
        return Vendas.objects.raw("""
            select '1' as id, sum(valor_total) as total, count(valor_total) as quantidade from vendas_vendas
            """)
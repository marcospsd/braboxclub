from .serializers import VendaSerializer
from rest_framework import viewsets
from .models import *


class VendasView(viewsets.ModelViewSet):
    queryset = Vendas.objects.all()
    serializer_class = VendaSerializer
from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Clientes
from .serializers import ClienteSerializer
# Create your views here.


class ClientesView(viewsets.ModelViewSet):
    queryset = Clientes.objects.all()
    serializer_class = ClienteSerializer

class ClientesSearchView(generics.ListAPIView):
    queryset = Clientes.objects.all()
    serializer_class = ClienteSerializer

    def get_queryset(self):
        if self.kwargs.get('nome_pk'):
            return self.queryset.filter(nome__icontains=self.kwargs.get('nome_pk'))[:7]

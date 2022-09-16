from .serializers import *
from rest_framework import viewsets
from .models import *
# Create your views here.

class ProdutosView(viewsets.ModelViewSet):
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer
from .serializers import *
from rest_framework import viewsets, generics, status
from .models import *
from rest_framework.response import Response
# Create your views here.

class ProdutosView(viewsets.ModelViewSet):
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer

    
class ProdutoSearchView(generics.ListAPIView):
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer

    def get_queryset(self):
        if self.kwargs.get('desc_pk'):
            return self.queryset.filter(descricao__icontains=(self.kwargs.get('desc_pk')))[:7]

  
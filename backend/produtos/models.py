from django.db import models

# Create your models here.


class Categoria(models.Model):
    nome = models.CharField(max_length=50)

class Marca(models.Model):
    nome = models.CharField(max_length=50)

class Produtos(models.Model):
    descricao = models.CharField(max_length=150)
    categoria = models.ForeignKey(Categoria, related_name='produto_categoria', on_delete=models.CASCADE)
    marca = models.ForeignKey(Marca, related_name='produto_marca', on_delete=models.CASCADE)
    custo_un = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    valor_venda = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    estoque = models.IntegerField(default=0)
    
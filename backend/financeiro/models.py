from django.db import models
from clientes.models import *
from vendas.models import *

class Financiamento(models.Model):
    cliente = models.ForeignKey(Clientes, related_name="cliente_finan", on_delete=models.CASCADE)
    venda = models.ForeignKey(Vendas, related_name='venda_finan', on_delete=models.CASCADE)
    parcela = models.IntegerField()
    emissao = models.DateField()
    vencimento = models.DateField()
    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    saldo = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.BooleanField(default=False)
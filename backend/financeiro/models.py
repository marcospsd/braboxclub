from django.db import models
from clientes.models import *
from vendas.models import *

statusmodels = (
    ('A', 'Aberto'),
    ('B', 'Baixado'),
    ('P', 'Parcial')
)

class Financiamento(models.Model):
    cliente = models.ForeignKey(Clientes, related_name="cliente_finan", on_delete=models.CASCADE)
    venda = models.ForeignKey(Vendas, related_name='venda_finan', on_delete=models.CASCADE)
    parcela = models.IntegerField()
    dt_emissao = models.DateField()
    dt_vencimento = models.DateField()
    dt_baixa = models.DateField(null=True, blank=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    saldo = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=1, choices=statusmodels, default='A')
from tkinter import CASCADE
from django.db import models
from produtos.models import Produtos
from clientes.models import *
from datetime import date
# Create your models here.

class Vendas(models.Model):
    cliente = models.ForeignKey(Clientes, related_name='vendascliente', on_delete=models.CASCADE)
    emissao = models.DateField(default=date.today())
    valor_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
class Corpo_venda(models.Model):
    venda = models.ForeignKey(Vendas, related_name='corpovenda_venda', on_delete=models.CASCADE)
    produto = models.ForeignKey(Produtos, related_name='produto_corpovenda', on_delete=models.CASCADE)
    valor_unit = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    valor_final = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    
formas = (
    ('CC', 'CARTÃO CREDITO'),
    ('CD', 'CARTÃO DEBITO'),
    ('FI', 'FINANCIAMENTO'),
    ('DH', 'DINHEIRO')
)
    
class Forma_Pagamento(models.Model):
    venda = models.ForeignKey(Vendas, related_name='formapag_venda', on_delete=models.CASCADE)
    formapag = models.CharField(max_length=2, choices=formas)
    parcelas = models.PositiveIntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    

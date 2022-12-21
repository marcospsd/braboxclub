from django.db import models

# Create your models here.

class Clientes(models.Model):
    nome = models.CharField(max_length=50)
    apelido = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11, blank=True, null=True)
    celular = models.CharField(max_length=12, blank=True, null=True)
    email = models.CharField(max_length=30, blank=True, null=True)
    cep = models.CharField(max_length=8, blank=True, null=True)
    rua = models.CharField(max_length=50, blank=True, null=True)
    bairro = models.CharField(max_length=50, blank=True, null=True)
    cidade = models.CharField(max_length=30, blank=True, null=True)
    estado = models.CharField(max_length=2, blank=True, null=True)
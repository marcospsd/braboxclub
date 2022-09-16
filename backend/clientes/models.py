from django.db import models

# Create your models here.

class Clientes(models.Model):
    nome = models.CharField(max_length=50)
    celular = models.CharField(max_length=12)
    cep = models.CharField(max_length=8)
    rua = models.CharField(max_length=50)
    bairro = models.CharField(max_length=50)
    cidade = models.CharField(max_length=30)
    
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
import os
from PIL import Image
from io import BytesIO

# Create your models here.


class Categoria(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self):
        return self.nome

class Marca(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self):
        return self.nome
    
class Tamanho(models.Model):
    tamanho = models.CharField(max_length=5)

    def __str__(self):
        return self.tamanho
    
class Modelo(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self):
        return self.nome
    

def nome_arquivo_imagem(instance, filename):
    nome_arquivo, extensao = os.path.splitext(filename)
    return 'produtos/{0}/imagem{1}'.format((instance.descricao).replace(" ", "-"), extensao)


def nome_arquivo_imagem_miniatura(instance, filename):
    nome_arquivo, extensao = os.path.splitext(filename)
    return 'produtos/{0}/miniatura{1}'.format((instance.descricao).replace(" ", "-"), extensao)

class Produtos(models.Model):
    descricao = models.CharField(max_length=150, blank=True)
    categoria = models.ForeignKey(Categoria, related_name='produto_categoria', on_delete=models.CASCADE)
    marca = models.ForeignKey(Marca, related_name='produto_marca', on_delete=models.CASCADE)
    modelo = models.ForeignKey(Modelo, related_name="produto_modelo", on_delete=models.CASCADE)
    tamanho = models.ForeignKey(Tamanho, related_name='produto_tamanho', on_delete=models.CASCADE)
    custo_un = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    valor_venda = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    estoque = models.IntegerField(default=0)
    imagem = models.ImageField(upload_to=nome_arquivo_imagem, blank=True)
    imagem_miniatura = ProcessedImageField(upload_to=nome_arquivo_imagem_miniatura,
                                      processors=[ResizeToFill(200, 200)],
                                      format='PNG',
                                      options={'quality': 75},
                                      blank=True,
                                      )

    def save(self, *args, **kwargs):
        self.descricao = f"{self.categoria} {self.marca} {self.modelo} {self.tamanho}"
        super().save(*args, **kwargs)
        if self.imagem:
            imagem = Image.open(self.imagem.path)
            buffer = BytesIO()
            imagem.save(buffer, format="PNG")
            self.imagem_miniatura.save("miniatura.png", buffer, save=False)
            super().save(update_fields=['imagem_miniatura'])
from django.db import models
from PIL import Image
import hashlib
import os
from io import BytesIO
from django.core.files import File
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
    imagem_miniatura = models.ImageField(upload_to=nome_arquivo_imagem_miniatura, blank=True)
    hash_imagem = models.CharField(max_length=40, blank=True)

    def save(self, *args, **kwargs):
        self.descricao = f"{self.categoria} {self.marca} {self.modelo} {self.tamanho}"
        super().save(*args, **kwargs)
        self.imagem_miniatura = self.imagem
        if self.imagem:
            # Redimensiona e salva a imagem grande
            imagem_grande = Image.open(self.imagem.path)
            imagem_grande = imagem_grande.resize((800, 800), Image.ANTIALIAS)
            imagem_grande.save(self.imagem.path)
               
            # Redimensiona e salva a imagem em miniatura
            imagem_miniatura = Image.open(self.imagem_miniatura.path)
            imagem_miniatura = imagem_miniatura.resize((200, 200), Image.ANTIALIAS)
            imagem_miniatura.save(self.imagem_miniatura.path)
            # Atualiza o hash da imagem
            self.hash_imagem = self._get_imagem_hash()
            
            # Salva o produto novamente, atualizando os campos imagem, imagem_miniatura e hash_imagem
            super().save(update_fields=['imagem', 'imagem_miniatura', 'hash_imagem'])
            print(self.hash_imagem)

    def _get_imagem_hash(self):
        if not self.imagem:
            return ''
        if os.path.isfile(self.imagem.path):
            with open(self.imagem.path, 'rb') as f:
                return hashlib.sha1(f.read()).hexdigest()
        else:
            return ""
# Generated by Django 4.0.5 on 2023-03-31 17:19

from django.db import migrations, models
import imagekit.models.fields
import produtos.models


class Migration(migrations.Migration):

    dependencies = [
        ('produtos', '0003_produtos_hash_imagem_produtos_imagem_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='produtos',
            name='hash_imagem',
        ),
        migrations.AlterField(
            model_name='produtos',
            name='descricao',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name='produtos',
            name='imagem_miniatura',
            field=imagekit.models.fields.ProcessedImageField(upload_to=produtos.models.nome_arquivo_imagem_miniatura),
        ),
    ]
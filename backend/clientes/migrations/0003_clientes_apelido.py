# Generated by Django 4.0.5 on 2022-12-21 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_clientes_cpf_clientes_email_clientes_estado_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientes',
            name='apelido',
            field=models.CharField(default='data', max_length=100),
            preserve_default=False,
        ),
    ]

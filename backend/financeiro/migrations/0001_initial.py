# Generated by Django 4.0.5 on 2022-09-11 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('vendas', '0001_initial'),
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Financiamento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parcela', models.IntegerField()),
                ('emissao', models.DateField()),
                ('vencimento', models.DateField()),
                ('valor', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('saldo', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('status', models.BooleanField(default=False)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cliente_finan', to='clientes.clientes')),
                ('venda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='venda_finan', to='vendas.vendas')),
            ],
        ),
    ]

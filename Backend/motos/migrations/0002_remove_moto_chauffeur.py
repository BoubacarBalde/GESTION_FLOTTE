# Generated by Django 5.0.6 on 2024-06-28 22:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('motos', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='moto',
            name='chauffeur',
        ),
    ]

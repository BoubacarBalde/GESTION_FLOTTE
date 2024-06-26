# your_app/migrations/0002_auto_add_permissions.py
from django.db import migrations

def create_permissions(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Permission = apps.get_model('auth', 'Permission')

    manager_group, created = Group.objects.get_or_create(name='Manager')
    chauffeur_group, created = Group.objects.get_or_create(name='Chauffeur')

    can_add_chauffeur = Permission.objects.get(codename='add_utilisateur')
    manager_group.permissions.add(can_add_chauffeur)

class Migration(migrations.Migration):
    dependencies = [
        ('utilisateurs', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_permissions),
    ]

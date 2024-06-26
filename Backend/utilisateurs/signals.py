# your_app/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from .models import Utilisateur

@receiver(post_save, sender=Utilisateur)
def assign_group(sender, instance, created, **kwargs):
    if created:
        if instance.type_utilisateur == 'manager':
            group, created = Group.objects.get_or_create(name='Manager')
            instance.groups.add(group)
        elif instance.type_utilisateur == 'chauffeur':
            group, created = Group.objects.get_or_create(name='Chauffeur')
            instance.groups.add(group)

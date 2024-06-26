from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.conf import settings
from motos.models import Moto


# #Model Panne
class Panne(models.Model):
    ETAT_PANNE = (
        ('non_corrigee', 'Non corrigée'),
        ('corrigee', 'Corrigée'),
    )
    
    moto = models.ForeignKey(Moto, on_delete=models.CASCADE)
    description = models.TextField()
    date_signalement = models.DateField()
    etat = models.CharField(max_length=12, choices=ETAT_PANNE, default='non_corrigee')
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='panne_created_by', on_delete=models.SET_NULL, null=True)
    modified_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='panne_modified_by', on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"Panne {self.moto.numero_serie} - {self.date_signalement}"
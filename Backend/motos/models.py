from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.conf import settings
from utilisateurs.models import Utilisateur


#Model Moto
class Moto(models.Model):
    numero_serie = models.CharField(max_length=50,unique=True)
    color = models.CharField(max_length=50)
    date_achat = models.DateField()
    chauffeur = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to='moto_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='moto_created_by', on_delete=models.SET_NULL, null=True)
    modified_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='moto_modified_by', on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.numero_serie
    
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.conf import settings


#Model Chauffeur
class Chauffeur(models.Model):
      utilisteur = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
      contrat_type = models.CharField(max_length=10, choices=[('crédit', 'Crédit'), ('embauche', 'Embauche')])
      created_at = models.DateTimeField(auto_now_add=True)
      created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='chauffeur_created_by', on_delete=models.SET_NULL, null=True)
      modified_at = models.DateTimeField(auto_now_add=True)
      modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='chauffeur_modified_by', on_delete=models.SET_NULL, null=True)
      
      def __str__(self):
        return f"{self.utilisteur.username}"
      
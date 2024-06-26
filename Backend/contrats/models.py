from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.conf import settings
from chauffeurs.models import Chauffeur
from motos.models import Moto

# #Model Contrat
class Contrat(models.Model):
    ETAT_CONTRAT = (
        ('en_cours', 'En cours'),
        ('termine', 'Terminé'),
        ('annule', 'Annulé'),
    )
    chauffeur = models.ForeignKey(Chauffeur, on_delete=models.CASCADE)
    moto = models.ForeignKey(Moto, on_delete=models.CASCADE)
    type_contrat = models.CharField(max_length=10, choices=[('crédit', 'Crédit'), ('embauche', 'Embauche')])
    montant_initial = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    montant_journalier = models.DecimalField(max_digits=10, decimal_places=2)
    date_debut = models.DateField()
    date_fin = models.DateField(null=True, blank=True)
    etat = models.CharField(max_length=10, choices=ETAT_CONTRAT, default="en_cours")
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='contrat_created_by', on_delete=models.SET_NULL, null=True)
    modified_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='contrat_modified_by', on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"Contrat {self.type_contrat}-{self.chauffeur.utilisateur.first_name} {self.chauffeur.utilisateur.last_name}"
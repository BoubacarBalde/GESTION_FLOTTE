from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

# Modèle Utilisateur
class Utilisateur(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='utilisateur_groups',  # Nom unique pour éviter les conflits
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='utilisateur_permissions',  # Nom unique pour éviter les conflits
        blank=True
    )
    
    TYPES_UTILISATEUR = (
         ('admin','Admin'),
         ('manager','Manager'),
         ('chauffeur','Chauffeur'),
    )
    type_utilisateur = models.CharField(max_length=10, choices=TYPES_UTILISATEUR)
    telephone = models.CharField(max_length=15, null=True, blank=True)
    adress = models.TextField(null=True, blank=True)  # Correction de la faute de frappe "adress" -> "address"
    date_embauche = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='user_images/', null=True, blank=True)  # Champ image ajouté

    
    def __str__(self):
        return self.username
    
    # def save(self, *args, **kwargs):
    #     if self.type_utilisateur == 'admin':
    #         self.is_staff = True
    #         self.is_superuser = True
    #     elif self.type_utilisateur == 'manager':
    #         self.is_staff = True
    #         self.is_superuser = False
    #     else:
    #         self.is_staff = False
    #         self.is_superuser = False
    #     super().save(*args, **kwargs)

    # def has_perm(self, perm, obj=None):
    #     if self.type_utilisateur == 'manager':
    #         return True
    #     return super().has_perm(perm, obj)

    # def has_module_perms(self, app_label):
    #     if self.type_utilisateur == 'manager':
    #         return True
    #     return super().has_module_perms(app_label)

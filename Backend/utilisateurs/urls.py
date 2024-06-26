# utilisateurs/urls.py
from django.urls import path
from .views import CreateChauffeurView, CreateManagerView, renvoiAdminManager, renvoiChaufeur,EditDeleterManagerChaufeur, UtilisateurConnexion, renvoiManagersEtChauffeurs, renvoiUtilisateur

urlpatterns = [
    path('utilisateurs/', CreateChauffeurView.as_view(), name='utilisateurs'),
    path('list-utilisateurs/', renvoiUtilisateur, name='list-utilisateur'),
    path('list-chauffeur/', renvoiChaufeur, name='list-chauffeur'),
    path('managers-chauffeurs/', renvoiManagersEtChauffeurs, name='managers-chauffeurs'),
    path('admin-managers/', renvoiAdminManager, name='admin-managers'),
    path('connexion/<str:username>/', UtilisateurConnexion, name='connexion'),  # Notez le '/' à la fin
    path('managerchauffeur/<int:id>/', EditDeleterManagerChaufeur, name='managerchauffeur'),
    path('create-manager/', CreateManagerView.as_view(), name='create-manager'),
    path('create-chauffeur/', CreateChauffeurView.as_view(), name='create-chauffeur'),
    
    # path('utilisateurs/', UtilisateurUploadView.as_view(), name='utilisateur-list-create'),
    # path('utilisateurs/<int:pk>/', UtilisateurUploadView.as_view(), name='utilisateur-detail'),
]

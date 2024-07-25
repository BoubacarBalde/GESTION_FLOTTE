# contrats/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContratViewSet, renvoieContrat

router = DefaultRouter()
router.register(r'contrats', ContratViewSet)
# router.register(r'contrats/<int:chauffeur>', renvoieContrat)

urlpatterns = [
    path('', include(router.urls)),
    path('contrats/chauffeur/<int:chauffeur>/', renvoieContrat, name='contrats-chauffeur'),
]

# recettes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecetteViewSet

router = DefaultRouter()
router.register(r'recettes', RecetteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

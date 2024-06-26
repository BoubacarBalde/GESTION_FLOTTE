# pannes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PanneViewSet

router = DefaultRouter()
router.register(r'pannes', PanneViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

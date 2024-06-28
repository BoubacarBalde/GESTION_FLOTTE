# contrats/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Contrat
from .serializers import ContratSerializer
from utilisateurs.permissions import IsAdminOrIsManager

class ContratViewSet(viewsets.ModelViewSet):
    queryset = Contrat.objects.all()
    serializer_class = ContratSerializer
    permission_classes = [IsAuthenticated, IsAdminOrIsManager]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, modified_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(modified_by=self.request.user)

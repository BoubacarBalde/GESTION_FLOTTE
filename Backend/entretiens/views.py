# entretiens/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Entretien
from .serializers import EntretienSerializer
from utilisateurs.permissions import IsAdminOrIsManager

class EntretienViewSet(viewsets.ModelViewSet):
    queryset = Entretien.objects.all()
    serializer_class = EntretienSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, modified_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(modified_by=self.request.user)

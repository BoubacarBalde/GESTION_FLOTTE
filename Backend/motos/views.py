# motos/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Moto
from .serializers import MotoSerializer
from utilisateurs.permissions import IsAdminOrIsManager
from rest_framework.parsers import MultiPartParser, FormParser

class MotoViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Moto.objects.all()
    serializer_class = MotoSerializer
    permission_classes = [IsAuthenticated, IsAdminOrIsManager ]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, modified_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(modified_by=self.request.user)

# pannes/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Panne
from .serializers import PanneSerializer

class PanneViewSet(viewsets.ModelViewSet):
    queryset = Panne.objects.all()
    serializer_class = PanneSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, modified_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(modified_by=self.request.user)

from queue import Full
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Contrat
from .serializers import ContratSerializer
from utilisateurs.permissions import IsAdminOrIsManager
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

class ContratViewSet(viewsets.ModelViewSet):
    queryset = Contrat.objects.all()
    serializer_class = ContratSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, modified_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(modified_by=self.request.user)
        
        
#Recuperation des donnees d'un contrat
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def renvoieContrat(request, chauffeur):
    try:
        contrat = Contrat.objects.get(chauffeur=chauffeur)
    except Contrat.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContratSerializer(contrat)
        return Response(serializer.data)
    

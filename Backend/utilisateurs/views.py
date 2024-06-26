from rest_framework.response import Response
from .models import Utilisateur
from .serializers import UtilisateurSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

#Importation pour chauffeur
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin, IsManager, IsAdminOrIsManager


# Création Chauffeur
class CreateChauffeurView(generics.CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Utilisateur.objects.filter(type_utilisateur='chauffeur')
    serializer_class = UtilisateurSerializer
    permission_classes = [IsAuthenticated, IsAdminOrIsManager]

    def perform_create(self, serializer):
        serializer.save(type_utilisateur='chauffeur')

# Création Manager
class CreateManagerView(generics.CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Utilisateur.objects.filter(type_utilisateur='manager')
    serializer_class = UtilisateurSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def perform_create(self, serializer):
        serializer.save(type_utilisateur='manager', is_staff=True, is_active=True)
        
        
#Recuperation des donnees de l'utilisateur connecter
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrIsManager])
def UtilisateurConnexion(request, username):
    try:
        utilisateur = Utilisateur.objects.get(username=username)
    except Utilisateur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UtilisateurSerializer(utilisateur)
        return Response(serializer.data)    
   
#Renvoie de tout les chauffeur
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrIsManager])
def renvoiChaufeur(request):
    if request.method == 'GET':
        chauffeurs = Utilisateur.objects.filter(type_utilisateur='chauffeur')  # Assurez-vous que le filtre est correct
        serializer = UtilisateurSerializer(chauffeurs, many=True)
        return Response(serializer.data)
 
#Renvoie de tout les Managers et Chauffeurs
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrIsManager])
def renvoiManagersEtChauffeurs(request):
    if request.method == 'GET':
        utilisateurs = Utilisateur.objects.filter(type_utilisateur__in=['manager', 'chauffeur'])
        serializer = UtilisateurSerializer(utilisateurs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
#Renvoie de tout les Managers et Admin
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrIsManager])
def renvoiAdminManager(request):
    if request.method == 'GET':
        utilisateurs = Utilisateur.objects.filter(type_utilisateur__in=['admin', 'manager'])
        serializer = UtilisateurSerializer(utilisateurs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
#Renvoie de tout les Utilisateur
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrIsManager])
def renvoiUtilisateur(request):
    if request.method == 'GET':
        utilisateurs = Utilisateur.objects.all()
        serializer = UtilisateurSerializer(utilisateurs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)   
    
#Edit Update delete pour le manager et le chauffeur
@api_view(['GET','PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsAdminOrIsManager])
def EditDeleterManagerChaufeur(request, id):
    
    try:
      chauffeur = Utilisateur.objects.get(pk=id)
    
    except Utilisateur.DoesNotExist:
        return RecursionError(status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
       serializer = UtilisateurSerializer(chauffeur)
       return Response(serializer.data)
   
    elif request.method == 'PUT':
       serializer = UtilisateurSerializer(chauffeur, data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        chauffeur.delete()
        return Response({"message": "Chauffeur deleted successfully"}, status=204)
    
    
    
##Ajout des utilisateurs avec des images
# class UtilisateurUploadView(APIView):
#     parser_classes = (MultiPartParser, FormParser)
#     permission_classes = [IsAuthenticated, IsAdminOrIsManager]

#     def get(self, request, *args, **kwargs):
#         users = Utilisateur.objects.all()
#         serializer = UtilisateurSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request, *args, **kwargs):
#         serializer = UtilisateurSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, *args, **kwargs):
#         user_id = kwargs.get('pk')
#         try:
#             user = Utilisateur.objects.get(pk=user_id)
#         except Utilisateur.DoesNotExist:
#             return Response({'error': 'Utilisateur non trouvé.'}, status=status.HTTP_404_NOT_FOUND)

#         serializer = UtilisateurSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, *args, **kwargs):
#         user_id = kwargs.get('pk')
#         try:
#             user = Utilisateur.objects.get(pk=user_id)
#             user.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Utilisateur.DoesNotExist:
#             return Response({'error': 'Utilisateur non trouvé.'}, status=status.HTTP_404_NOT_FOUND)
        

       











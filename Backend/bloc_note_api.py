# import logging
# from django.http import JsonResponse
# from .models import Utilisateur, Chauffeur
# from .serializers import UtilisateurSerializer, ChauffeurSerializer
# from rest_framework.decorators import api_view
# from rest_framework import status
# from django.contrib.auth import get_user_model


# # Configuration de base pour le logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)


# @api_view(['GET', 'POST'])
# def UtilisateurApi(request):
#     if request.method == 'GET':
#         utilisateurs = Utilisateur.objects.all()
#         serializer = UtilisateurSerializer(utilisateurs, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     if request.method == 'POST':
#         serializer = UtilisateurSerializer(data=request.data)
#         if serializer.is_valid():
#             data = serializer.validated_data
#             email = data.get('email')
#             telephone = data.get('telephone')

#             # Vérification des duplications avant sauvegarde
#             if email and Utilisateur.objects.filter(email=email).exists():
#                 logger.error(f"L'email {email} est déjà utilisé.")
#                 return Response({'error': "L'email fourni existe déjà."}, status=status.HTTP_400_BAD_REQUEST)

#             if telephone and Utilisateur.objects.filter(telephone=telephone).exists():
#                 logger.error(f"Le numéro de téléphone {telephone} est déjà utilisé.")
#                 return Response({'error': "Le numéro de téléphone fourni existe déjà."}, status=status.HTTP_400_BAD_REQUEST)

#             try:
#                 serializer.save()
#                 logger.info("Utilisateur créé avec succès: %s", serializer.data)
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             except Exception as e:
#                 logger.error(f"Erreur lors de la création de l'utilisateur: {e}", exc_info=True)
#                 return Response({'error': 'Erreur interne du serveur.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         else:
#             logger.warning("Données invalides fournies pour la création de l'utilisateur: %s", serializer.errors)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
# @api_view(['GET', 'PUT', 'DELETE'])
# def UtilisateurApiPutUpDel(request, id):
    
#     try:
#       utilisateur = Utilisateur.objects.get(pk=id)
#     except Utilisateur.DoesNotExist:
#         return RecursionError(status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#        serializer = UtilisateurSerializer(utilisateur)
#        return Response(serializer.data)
#     elif request.method == 'PUT':
#        serializer = UtilisateurSerializer(utilisateur, data=request.data)
#        if serializer.is_valid():
#            serializer.save()
#            return Response(serializer.data)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         utilisateur.delete()

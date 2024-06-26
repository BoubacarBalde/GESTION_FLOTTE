from rest_framework import serializers
from .models import Utilisateur

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = [
            'id', 'username', 'password', 'email', 'type_utilisateur', 'telephone', 
            'adress', 'date_embauche','image',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    # def create(self, validated_data):
    #     user_type = validated_data.get('user_type', None)
    #     if user_type == 'manager':
    #         validated_data['is_staff'] = True
    #         validated_data['is_active'] = True
    #     elif user_type == 'user':
    #         validated_data['is_staff'] = False
    #         validated_data['is_active'] = True
    #     user = Utilisateur.objects.create_user(**validated_data)
    #     return user

    # def update(self, instance, validated_data):
    #     password = validated_data.pop('password', None)
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     if password:
    #         instance.set_password(password)
    #     instance.save()
    #     return instance

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = Utilisateur.objects.all()
#     serializer_class = UtilisateurSerializer
#     # permission_classes = [IsAuthenticated]
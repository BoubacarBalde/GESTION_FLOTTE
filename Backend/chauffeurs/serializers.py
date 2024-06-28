# from rest_framework import serializers
# from .models import Chauffeur

# class ChauffeurSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Chauffeur
#         fields = ['id','utilisteur','contrat_type','created_by','modified_by']

#     def validate_utilisteur(self, value):
#         if not value:
#             raise serializers.ValidationError("L'utilisateur est requis.")
#         return value

#     # def create(self, validated_data):
#     #     user = self.context['request'].user
#     #     validated_data['created_by'] = user
#     #     validated_data['modified_by'] = user
#     #     return super().create(validated_data)

#     # def update(self, instance, validated_data):
#     #     user = self.context['request'].user
#     #     validated_data['modified_by'] = user
#     #     return super().update(instance, validated_data)
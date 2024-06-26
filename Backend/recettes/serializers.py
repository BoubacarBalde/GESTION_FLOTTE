# recettes/serializers.py
from rest_framework import serializers
from .models import Recette

class RecetteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recette
        fields = '__all__'

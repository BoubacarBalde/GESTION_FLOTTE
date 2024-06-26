# pannes/serializers.py
from rest_framework import serializers
from .models import Panne

class PanneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Panne
        fields = '__all__'

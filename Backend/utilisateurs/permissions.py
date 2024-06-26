# permissions.py
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff and request.user.is_active

class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user and hasattr(request.user, 'type_utilisateur') and request.user.type_utilisateur == 'manager'

class IsAdminOrIsManager(BasePermission):
    def has_permission(self, request, view):
        is_admin = request.user and request.user.is_staff and request.user.is_active
        is_manager = request.user and hasattr(request.user, 'type_utilisateur') and request.user.type_utilisateur == 'manager'
        return is_admin or is_manager
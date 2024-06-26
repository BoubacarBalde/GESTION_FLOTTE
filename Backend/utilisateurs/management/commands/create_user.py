# your_app/management/commands/create_user.py
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone

class Command(BaseCommand):
    help = 'Create a new user'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('type_utilisateur', type=str, choices=['admin', 'manager', 'chauffeur'])
        parser.add_argument('--email', type=str, default='')
        parser.add_argument('--telephone', type=str, default='')
        parser.add_argument('--adress', type=str, default='')
        parser.add_argument('--date_embauche', type=str, default=None)

    def handle(self, *args, **options):
        User = get_user_model()
        date_embauche = options['date_embauche']
        if date_embauche:
            date_embauche = timezone.datetime.strptime(date_embauche, '%Y-%m-%d').date()
        user = User.objects.create_user(
            username=options['username'],
            password=options['password'],
            type_utilisateur=options['type_utilisateur'],
            email=options['email'],
            telephone=options['telephone'],
            adress=options['adress'],
            date_embauche=date_embauche
        )
        if options['type_utilisateur'] == 'manager':
            user.is_staff = True
            
        if options['type_utilisateur'] == 'admin':
            user.is_superuser = True
            user.is_staff = True
        user.save()
        self.stdout.write(self.style.SUCCESS(f"User {user.username} created successfully"))
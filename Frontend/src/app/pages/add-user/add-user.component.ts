import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/interface/interface';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  managerChauffeur: Utilisateur[] = [];
  chauffeurs: Utilisateur[] = [];
  editingUser: Utilisateur | null = null;
  username: string | undefined;
  utilisateur: Utilisateur | undefined;

  p: number = 1; // Page actuelle
  itemsPerPage: number = 4; // Nombre d'éléments par page

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      type_utilisateur: ['', Validators.required],
      telephone: ['', Validators.required],
      adress: ['', Validators.required],
      date_embauche: ['', Validators.required],
      image: [null] // Champ pour l'image
    });
  }

  ngOnInit(): void {
    this.getTypeUtilisateur();
    this.getChauffeurs();
    this.getManagersChauffeurs();
  }

  // Méthode pour récupérer le type d'utilisateur actuel
  getTypeUtilisateur() {
    this.username = this.authService.getUsername();
    this.authService.getUnsernameToken(this.username!).subscribe({
      next: (response) => {
        this.utilisateur = response;
      },
      error: () => console.log('Erreur de récupération')
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.addUserForm.valid) {
      const formData = new FormData();
      formData.append('username', this.addUserForm.get('username')!.value);
      formData.append('password', this.addUserForm.get('password')!.value);
      formData.append('type_utilisateur', this.addUserForm.get('type_utilisateur')!.value);
      formData.append('telephone', this.addUserForm.get('telephone')!.value);
      formData.append('adress', this.addUserForm.get('adress')!.value);
      formData.append('date_embauche', this.addUserForm.get('date_embauche')!.value);
      formData.append('image', this.addUserForm.get('image')!.value); // Assurez-vous que 'image' est correctement configuré dans votre template HTML

      if (this.editingUser) {
        // Mettre à jour l'utilisateur existant
        this.userService.updateMangerChauffeur(this.editingUser.id, formData).subscribe(response => {
          alert('Utilisateur mis à jour avec succès');
          if (this.utilisateur?.type_utilisateur === 'admin') {
            this.getManagersChauffeurs();
          } else {
            this.getChauffeurs();
          }
          this.editingUser = null;
          this.addUserForm.reset();
        });
      } else if (this.utilisateur?.type_utilisateur === 'admin') {
        if (this.addUserForm.value.type_utilisateur === 'manager') {
          // Ajouter un nouveau Manager
          this.userService.addManager(formData).subscribe(response => {
            alert('Manager créé avec succès');
            this.getManagersChauffeurs();
            this.addUserForm.reset();
          });
        } else {
          // Ajouter un nouveau Chauffeur
          this.userService.addChauffeur(formData).subscribe(response => {
            alert('Chauffeur créé avec succès');
            this.getChauffeurs();
            this.addUserForm.reset();
          });
        }
      } else {
        // Ajouter un nouveau Chauffeur (non-admin)
        this.userService.addChauffeur(formData).subscribe(response => {
          alert('Chauffeur créé avec succès');
          this.getChauffeurs();
          this.addUserForm.reset();
        });
      }
    }
  }

  // Méthode pour gérer le changement de fichier (upload d'image)
  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.addUserForm.get('image')?.setValue(file);
    }
  }

  // Récupérer la liste des chauffeurs
  getChauffeurs() {
    this.userService.getChauffeur().subscribe({
      next: (response) => {
        this.chauffeurs = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // Récupérer la liste des Managers et chauffeurs
  getManagersChauffeurs() {
    this.userService.getManagerChauffeur().subscribe({
      next: (response) => {
        this.managerChauffeur = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // Méthode pour éditer un utilisateur
  editUser(user: Utilisateur) {
    this.editingUser = user;
    this.addUserForm.patchValue(user);
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(user: Utilisateur) {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.id} ?`);
    if (confirmDelete) {
      this.userService.deleteManagerChauffeur(user.id).subscribe(response => {
        alert('Utilisateur supprimé avec succès');
        if (this.utilisateur?.type_utilisateur === 'admin') {
          this.getManagersChauffeurs();
        } else {
          this.getChauffeurs();
        }
      });
    }
  }
}

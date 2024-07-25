import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/interface/interface';
import { Recette, RectteService } from '../services/recette.service';
import { UserService } from 'src/app/services/user.service';
import { Contrat } from '../../contrat/services/contrat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-recette',
  templateUrl: './add-recette.component.html',
  styleUrls: ['./add-recette.component.css']
})
export class AddRecetteComponent {
  addRecetteForm: FormGroup;
  adminManegr: Utilisateur[] = [];
  chauffeurs: Utilisateur[] = [];
  recettes: Recette[] = [];
  recetteEdit: Recette | undefined;

  username: string | undefined;
  utilisateur: Utilisateur | undefined;
  // contratChauffeur: Contrat | undefined;

  p: number = 1; // Page actuelle
  itemsPerPage: number = 4; // Nombre d'éléments par page
  

  constructor(
          private recetteService: RectteService, 
          private fb: FormBuilder, 
          private authService: AuthService
        ) {
    this.addRecetteForm = this.fb.group({
      chauffeur: ['', Validators.required],
      date: ['', Validators.required],
      montant:['', Validators.required],
      created_by:['', Validators.required],
      modified_by: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.getAdminMange();
    this.getChauffeur();
    this.getAllRecette();
    this.getTypeUtilisateur();
  }

  //Recuperation de l'utilisateur connecter
  getTypeUtilisateur(){
    this.username = this.authService.getUsername()
    this.authService.getUnsernameToken(this.username!).subscribe({
      next:(response)=>{
        this.utilisateur = response;
        console.log(this.utilisateur);
        //  //Recuperation du contrat de l'utilisateur
        // this.contratService.getContratChaufeur(this.utilisateur.id).subscribe({
        //   next:(response)=>{
        //     this.contratChauffeur = response;
        //     console.log(this.contratChauffeur);
        //   },
        //   error: ()=> console.log('Erreur de recuperation du contrat')
        // })
      },
      error: ()=> console.log('Erreur de recuperation de l\'utilisateur')
    })
  }

  //Recuperation de toute les recttes
  getAllRecette(): void {
    this.recetteService.getAllRecette().subscribe(data=>{
      this.recettes = data;
    })
  }

   //Recuperation de tout les chauffeurs
   getChauffeur(): void {
    this.recetteService.getChauffeurs().subscribe(data=>{
      this.chauffeurs = data;
    })
  }
  
  //Recuperation de l'admin et manager
  getAdminMange(): void {
    this.recetteService.getAdminManagers().subscribe(data=>{
      this.adminManegr = data;
    })
  }


  onSubmit(): void {
    if(this.addRecetteForm.valid){
      if (this.recetteEdit) {
        this.recetteService.updateRecette(this.recetteEdit!.id, this.addRecetteForm.value).subscribe(respons  =>{
            alert('Recette modifier avec succès');
            this.getAdminMange();
            this.getChauffeur();
            this.getAllRecette()        
            this.addRecetteForm.reset();
        });
      } else {
        this.recetteService.addRectte(this.addRecetteForm.value).subscribe(response => {
          alert('Recette ajouter avec succès');
          this.getAdminMange();
          this.getChauffeur();
          this.getAllRecette()        
          this.addRecetteForm.reset();
        });
      }
    }
  }

  editRecette(recette: Recette): void {
    this.recetteEdit = recette;
    this.addRecetteForm.patchValue(recette);
  }

  deleteRecette(id: number): void {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer la Recette ${id} ?`);
    if(confirmDelete){
      this.recetteService.deleteRecette(id).subscribe(() => {
        this.getAllRecette();
      });
    }
  }

  //Recupertion d'un Admin, Manager par son Id;
  getUserById(userId: number): Utilisateur | undefined {       
    return this.chauffeurs.find(chauff => chauff.id === userId) ||
           this.adminManegr.find(admin => admin.id === userId);
  }

}

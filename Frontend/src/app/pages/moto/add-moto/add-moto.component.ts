import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moto, MotoService } from '../services/moto.service';
import { Utilisateur } from 'src/app/interface/interface';
import { Chauffeur } from '../../chauffeur/services/service-chauff.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-moto',
  templateUrl: './add-moto.component.html',
  styleUrls: ['./add-moto.component.css']
})
export class AddMotoComponent implements OnInit {
  addMotoForm: FormGroup;
  motos: Moto[] = [];
  adminManager: Utilisateur[] = [];
  utilisateurChauffeur: Utilisateur[] = [];
  userAll: Utilisateur[] = [];
  chauffeurs: Chauffeur[] = [];
  editingMoto: Moto | null = null;

  //Variable pour stocke le type utilisateur
  username: string | undefined;
  utilisateur: Utilisateur | undefined;


  constructor(private fb: FormBuilder, private motoServices: MotoService, private authService: AuthService){
    this.addMotoForm = this.fb.group({
      numero_serie: ['', Validators.required],
      color: ['', Validators.required],
      date_achat: ['', Validators.required],
      chauffeur: ['', Validators.required],
      image: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_by: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTypeUtilisateur();
    this.getChauffeur();
    this.getAdminManage();
    this.getChauffeurUti();
    this.getMotos();
    this.getUserAll();
  }

  //Recuperations des chauffeurs dans la table chauffeurs
  getChauffeur(){
    this.motoServices.getChauffeur().subscribe({
      next:(response)=>{
        this.chauffeurs = response;
      },
      error:(error)=>console.log(error)
    })
  }

  //Recuperations des chauffeurs dans la table chauffeurs
  getChauffeurUti(){
    this.motoServices.getChauffeurUtili().subscribe({
      next:(response)=>{
        this.utilisateurChauffeur = response;
      },
      error:(error)=>console.log(error)
    })
  }

  //Recuperations des utilisateur admin manager
  getAdminManage(){
    this.motoServices.getAdminManagers().subscribe({
      next:(response)=>{
        this.adminManager = response;
      },
      error:(error)=>console.log(error)
    })
  }

  //Recuperations de tout les utilisateurs
  getUserAll(){
    this.motoServices.getUserAll().subscribe({
      next:(response)=>{
        this.userAll = response;
      },
      error:(error)=>console.log(error)
    })
  }

   //Recuperations des motos
   getMotos(){
    this.motoServices.getAllMotos().subscribe({
      next:(response)=>{
        this.motos = response;
      },
      error:(error)=>console.log(error)
    })
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
    if (this.addMotoForm.valid) {
      const formData = new FormData();
      formData.append('numero_serie', this.addMotoForm.get('numero_serie')!.value);
      formData.append('color', this.addMotoForm.get('color')!.value);
      formData.append('date_achat', this.addMotoForm.get('date_achat')!.value);
      formData.append('chauffeur', this.addMotoForm.get('chauffeur')!.value);
      formData.append('image', this.addMotoForm.get('image')!.value);
      formData.append('created_by', this.addMotoForm.get('created_by')!.value);
      formData.append('modified_by', this.addMotoForm.get('modified_by')!.value); // Assurez-vous que 'image' est correctement configuré dans votre template HTML

      if (this.editingMoto) {
        // Mettre à jour la moto existante
        this.motoServices.updateMoto(this.editingMoto.id, formData).subscribe({
          next:()=>{
            alert('Moto mis à jour avec succès');
          this.getChauffeur();
          this.getChauffeurUti();
          this.getAdminManage();
          this.getMotos();   
          this.editingMoto = null;
          this.addMotoForm.reset();
          },
        });
      } else {
        // Ajouter une nouvelle moto
        this.motoServices.addMoto(formData).subscribe({
          next:()=>{
            alert('Moto créé avec succès');
            this.getChauffeur();
            this.getChauffeurUti();
            this.getAdminManage();
            this.getMotos();   
            this.editingMoto = null;
            this.addMotoForm.reset();
          },
        });
      }
    }
  }

  // Méthode pour gérer le changement de fichier (upload d'image)
  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.addMotoForm.get('image')?.setValue(file);
    }
  }

  // Méthode pour éditer un utilisateur
  editMoto(moto: Moto) {
    this.editingMoto = moto;
    this.addMotoForm.patchValue(moto);
  }

  // Méthode pour supprimer un utilisateur
  deleteMoto(moto: Moto) {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer la moto ${moto.id} ?`);
    if (confirmDelete) {
      this.motoServices.deleteMoto(moto.id).subscribe(response => {
        alert('Moto supprimé avec succès');
        this.getChauffeur();
        this.getChauffeurUti();
        this.getAdminManage();
        this.getMotos();   
        this.editingMoto = null;
        this.addMotoForm.reset();
      });
    }
  }

  //Recuperation de l'Admin, Manager, Chauffeur par l'id
  getUserById(userId: number): any | undefined {

    const verfication1 = this.chauffeurs.find(chauff => chauff.id === userId)
    const verfication2 = this.utilisateurChauffeur.find(utilisateurChauffeur => utilisateurChauffeur.id === userId) 

    if(verfication1){

      const idUser = verfication1.utilisteur

      return this.utilisateurChauffeur.find(useal => useal.id === idUser)

    }else if(verfication2){

      return this.utilisateurChauffeur.find(utilisateurChauffeur => utilisateurChauffeur.id === userId)

    }else{

      return this.adminManager.find(adminManager => adminManager.id === userId);
    }
           
  }
  
 

}

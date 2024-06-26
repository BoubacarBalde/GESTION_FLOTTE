import { Component } from '@angular/core';
import { Chauffeur, ServiceChauffService } from '../services/service-chauff.service';
import { Utilisateur } from 'src/app/interface/interface';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.css']
})
export class AddChauffeurComponent {
  // chauffeur: Chauffeur = { utilisateur: 0, contrat_type: '', created_by: 0, modified_by: 0 };
  addChauffeurForm: FormGroup;
  chauffuerEdit: Chauffeur | undefined; 
  chauffeurs: Chauffeur[] = [];
  utilisateurs: Utilisateur[] = [];
  adminManegr: Utilisateur[] = [];
  isEdit = false;

  p: number = 1; // Page actuelle
  itemsPerPage: number = 4; // Nombre d'éléments par page
  

  constructor(private ServiceChauffService: ServiceChauffService, private fb: FormBuilder, private userService: UserService) {
    this.addChauffeurForm = this.fb.group({
      utilisteur: ['', Validators.required],
      contrat_type: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_by: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.loadChauffeurs();
    this.loadAdminMange();
    this.loadUsers();
  }

  loadChauffeurs(): void {
    this.ServiceChauffService.getChauffeurs().subscribe(data => {
      this.chauffeurs = data;
    });
  }

  loadUsers(): void {
    this.userService.getChauffeur().subscribe(data => {
      this.utilisateurs = data;
    });
  }

  loadAdminMange(): void {
    this.userService.getAdminManagers().subscribe(data=>{
      this.adminManegr = data;
    })
  }

  onSubmit(): void {
    if(this.addChauffeurForm.valid){
      if (this.chauffuerEdit) {
        this.ServiceChauffService.updateChauffeur(this.chauffuerEdit.id, this.addChauffeurForm.value).subscribe({
          next:()=>{
            alert('Chauffeur modifier avec succès');
            this.loadChauffeurs();
            this.loadAdminMange();
            this.addChauffeurForm.reset();
          },
          error:()=>{alert('Ce Chauffeur existe deja')}      
        });
      } else {
        this.ServiceChauffService.createChauffeur(this.addChauffeurForm.value).subscribe({
          next:()=>{
            alert('Chauffeur créé avec succès');
            this.loadChauffeurs();
            this.loadAdminMange();
            this.addChauffeurForm.reset();
          },
          error:()=>{alert('Ce Chauffeur existe deja')}
        });
      }
    }
  }

  editChauffeur(chauffeur: Chauffeur): void {
    this.chauffuerEdit = chauffeur;
    this.addChauffeurForm.patchValue(chauffeur);
  }

  deleteChauffeur(id: number): void {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer le Chauffeur ${id} ?`);
    if(confirmDelete){
      this.ServiceChauffService.deleteChauffeur(id).subscribe(() => {
        this.loadChauffeurs();
      });
    }
  }

  getUserById(userId: number): Utilisateur | undefined {
    return this.utilisateurs.find(utilisateur => utilisateur.id === userId) ||
           this.adminManegr.find(admin => admin.id === userId);
  }
  
}

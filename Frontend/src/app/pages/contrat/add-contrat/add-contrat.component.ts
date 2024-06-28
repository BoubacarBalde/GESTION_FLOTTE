import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contrat, ContratService } from '../services/contrat.service';
import { Chauffeur } from '../../chauffeur/services/service-chauff.service';
import { Utilisateur } from 'src/app/interface/interface';
import { UserService } from 'src/app/services/user.service';
import { Moto } from '../../moto/services/moto.service';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent {
 
  addContratForm: FormGroup;
  contratEdit: Contrat | undefined; 
  chauffeurs: Utilisateur[] = [];
  adminManegr: Utilisateur[] = [];
  motos: Moto[] = [];
  contrats: Contrat[] = [];
  isEdit = false;

  p: number = 1; // Page actuelle
  itemsPerPage: number = 4; // Nombre d'éléments par page
  

  constructor(private contratService: ContratService, private fb: FormBuilder, private userService: UserService) {
    this.addContratForm = this.fb.group({
      chauffeur: ['', Validators.required],
      moto: ['', Validators.required],
      type_contrat: ['', Validators.required],
      montant_initial: [''],
      montant_journalier: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: [''],
      etat: ['', Validators.required],
      created_by: ['',Validators.required],
      modified_by: ['',Validators.required]
    });
   }

  ngOnInit(): void {
    this.gethauffeurs();
    this.getAdminMange();
    this.getAllContrat();
    this.getMoto();
   
  }
  
  //Recuperations des chauffeurs dans la table Utilisateurs
  gethauffeurs(): void {
    this.contratService.getChauffeurs().subscribe(data => {
      this.chauffeurs = data;
    });
  }


  //Recuperation de l'admin et manager
  getAdminMange(): void {
    this.contratService.getAdminManagers().subscribe(data=>{
      this.adminManegr = data;
    })
  }

  //Recuperation de l'admin et manager
  getMoto(): void {
    this.contratService.getAllMotos().subscribe(data=>{
      this.motos = data;
    })
  }

   //Recuperation de tout les contrats
   getAllContrat(): void {
    this.contratService.getAllContrat().subscribe(data=>{
      this.contrats = data;
    })
  }

  onSubmit(): void {
    if(this.addContratForm.valid){
      if (this.contratEdit) {
        this.contratService.updateContrat(this.contratEdit!.id, this.addContratForm.value).subscribe({
          next:()=>{
            alert('Contrat modifier avec succès');
            this.gethauffeurs();
            this.getAdminMange();
            this.getAllContrat();
            this.addContratForm.reset();
          },
          error:()=>{alert('Ce contrat existe deja')}      
        });
      } else {
        this.contratService.addContrat(this.addContratForm.value).subscribe(response=>{
            alert('Contrat effectue avec succès');
            this.gethauffeurs();
            this.getAdminMange();
            this.getAllContrat();
            this.addContratForm.reset();
        });
      }
    }
  }

  editContrat(contrat: Contrat): void {
    this.isEdit = true
    this.contratEdit = contrat;
    this.addContratForm.patchValue(contrat);
  }

  deleteContrat(id: number): void {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer le contrat ${id} ?`);
    if(confirmDelete){
      this.contratService.deleteContrat(id).subscribe(() => {
        this.getAllContrat()
      });
    }
  }

  //Recupertion d'un Admin, Manager, Chauffer par son Id;
  getUserById(userId: number): Utilisateur | undefined {       
    return this.chauffeurs.find(chauff => chauff.id === userId) ||
           this.adminManegr.find(admin => admin.id === userId);
  }

  //Recupertion d'une moto par son Id;
  getMotoById(userId: number): Moto | undefined {
    return this.motos.find(mot => mot.id === userId);    
  }


}

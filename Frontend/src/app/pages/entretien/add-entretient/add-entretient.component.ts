import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Panne } from '../../panne/services/panne.service';
import { Entretien, EntretienService } from '../services/entretien.service';
import { Moto } from '../../moto/services/moto.service';
import { Utilisateur } from 'src/app/interface/interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-entretient',
  templateUrl: './add-entretient.component.html',
  styleUrls: ['./add-entretient.component.css']
})
export class AddEntretientComponent {
  addEntretienForm: FormGroup;
  adminManegr: Utilisateur[] = [];
  motos: Moto[] = [];
  entretiens: Entretien[] = [];
  entretienEdit: Entretien | undefined; 


  p: number = 1; // Page actuelle
  itemsPerPage: number = 4; // Nombre d'éléments par page
  

  constructor(private entretienService: EntretienService, private fb: FormBuilder, private userService: UserService) {
    this.addEntretienForm = this.fb.group({
      moto: ['',Validators.required], // ID de la moto
      type_entretien:['',Validators.required],
      date_entretion: ['',Validators.required], // Date en format ISO
      description: ['',Validators.required],
      created_by:['',Validators.required], // ID de l'utilisateur ou null
      modified_by: ['',Validators.required],
    });
   }

  ngOnInit(): void {
    this.getAdminMange();
    this.getMoto();
    this.getAllPEntretien();
   
  }
  

  //Recuperation de l'admin et manager
  getAdminMange(): void {
    this.entretienService.getAdminManagers().subscribe(data=>{
      this.adminManegr = data;
    })
  }

  //Recuperation des motos
  getMoto(): void {
    this.entretienService.getAllMotos().subscribe(data=>{
      this.motos = data;
    })
  }

   //Recuperation des Entretiens
   getAllPEntretien(): void {
    this.entretienService.getAllEntretion().subscribe(data=>{
      this.entretiens = data;
    })
  }

  onSubmit(): void {
    if(this.addEntretienForm.valid){
      if (this.entretienEdit) {
        this.entretienService.updateEntretien(this.entretienEdit!.id, this.addEntretienForm.value).subscribe(respons  =>{
            alert('Entretien modifier avec succès');
            this.getAdminMange();
            this.getMoto();
            this.getAllPEntretien();
            this.addEntretienForm.reset();
        });
      } else {
        this.entretienService.addEntretion(this.addEntretienForm.value).subscribe(response => {
          alert('Entretien effectue avec succès');
          this.getAdminMange();
          this.getMoto();
          this.getAllPEntretien();
          this.addEntretienForm.reset();
        });
      }
    }
  }

  editEntretien(entretien: Entretien): void {
    this.entretienEdit = entretien;
    this.addEntretienForm.patchValue(entretien);
  }

  deleteEntretien(id: number): void {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer l'entretien ${id} ?`);
    if(confirmDelete){
      this.entretienService.deleteEntretien(id).subscribe(() => {
        this.getAllPEntretien();
      });
    }
  }

  //Recupertion d'un Admin, Manager par son Id;
  getUserById(userId: number): Utilisateur | undefined {       
    return this.adminManegr.find(admin => admin.id === userId);
  }

  //Recupertion d'une moto par son Id;
  getMotoById(userId: number): Moto | undefined {
    return this.motos.find(mot => mot.id === userId);    
  }

}

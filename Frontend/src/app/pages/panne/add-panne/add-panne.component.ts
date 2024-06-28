import { Component } from '@angular/core';
import { Panne, PanneService } from '../services/panne.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moto } from '../../moto/services/moto.service';
import { UserService } from 'src/app/services/user.service';
import { Utilisateur } from 'src/app/interface/interface';

@Component({
  selector: 'app-add-panne',
  templateUrl: './add-panne.component.html',
  styleUrls: ['./add-panne.component.css']
})
export class AddPanneComponent {
  addPanneForm: FormGroup;
  panneEdit: Panne | undefined; 
  adminManegr: Utilisateur[] = [];
  motos: Moto[] = [];
  pannes: Panne[] = [];


  p: number = 1; // Page actuelle
  itemsPerPage: number = 4; // Nombre d'éléments par page
  

  constructor(private panneService: PanneService, private fb: FormBuilder, private userService: UserService) {
    this.addPanneForm = this.fb.group({
      moto:['', Validators.required],
      description:['', Validators.required],
      date_signalement:['', Validators.required],
      etat:['', Validators.required],
      created_by:['', Validators.required],
      modified_by:['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.getAdminMange();
    this.getMoto();
    this.getAllPanne();
   
  }
  

  //Recuperation de l'admin et manager
  getAdminMange(): void {
    this.panneService.getAdminManagers().subscribe(data=>{
      this.adminManegr = data;
    })
  }

  //Recuperation de l'admin et manager
  getMoto(): void {
    this.panneService.getAllMotos().subscribe(data=>{
      this.motos = data;
    })
  }

   //Recuperation de l'admin et manager
   getAllPanne(): void {
    this.panneService.getAllPanne().subscribe(data=>{
      this.pannes = data;
    })
  }


  onSubmit(): void {
    if(this.addPanneForm.valid){
      if (this.panneEdit) {
        this.panneService.updatePanne(this.panneEdit!.id, this.addPanneForm.value).subscribe(respons  =>{
            alert('Panne modifier avec succès');
            this.getAdminMange();
            this.getMoto();
            this.getAllPanne();
            this.addPanneForm.reset();
        });
      } else {
        this.panneService.addPanne(this.addPanneForm.value).subscribe(response => {
            alert('Panne ajouter avec succès');
            this.getAdminMange();
            this.getMoto();
            this.getAllPanne();
            this.addPanneForm.reset();
        });
      }
    }
  }

  editPanne(panne: Panne): void {
    this.panneEdit = panne;
    this.addPanneForm.patchValue(panne);
  }

  deletePanne(id: number): void {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer la panne ${id} ?`);
    if(confirmDelete){
      this.panneService.deletePanne(id).subscribe(() => {
        this.getAllPanne();
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

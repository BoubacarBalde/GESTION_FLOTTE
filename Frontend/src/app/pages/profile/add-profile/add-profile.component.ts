import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/interface/interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  addUtilisateurForm: FormGroup;

  username: string | undefined;
  utilisateur: Utilisateur | undefined;

  constructor(private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService){
    this.addUtilisateurForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      telephone: ['', Validators.required],
      adress: ['', Validators.required],
      image: [null] // Champ pour l'image
    });
  }

  
  ngOnInit(): void {
    this.getTypeUtilisateur();
  }
  

  //Recuperation de l'utilisateur connecter
  getTypeUtilisateur(){
    this.username = this.authService.getUsername()
    this.authService.getUnsernameToken(this.username!).subscribe({
      next:(response)=>{
        this.utilisateur = response;
        console.log(this.utilisateur);
      },
      error: ()=> console.log('Erreur de recuperation')
      
    })
  }

  onSubmit(){
    if(this.addUtilisateurForm.value){

      const formData = new FormData();
      formData.append('username', this.addUtilisateurForm.get('username')!.value);
      formData.append('email', this.addUtilisateurForm.get('email')!.value);
      formData.append('password', this.addUtilisateurForm.get('password')!.value);
      formData.append('adress', this.addUtilisateurForm.get('adress')!.value);
      formData.append('telephone', this.addUtilisateurForm.get('telephone')!.value);
      formData.append('image', this.addUtilisateurForm.get('image')!.value); // Assurez-vous que 'image' est correctement configuré dans votre template HTML

      this.profileService.updateUtilisateur(this.utilisateur!.id, formData).subscribe({
        next:()=>{
          alert('Modification effectuer avec succes');
          this.addUtilisateurForm.reset()
          this.getTypeUtilisateur();
        },
        error:(error)=> console.log(error)
      })

    }else{
      alert('Veuillez remplire tout les champs obligatoire!')
    }

  }

  // Méthode pour gérer le changement de fichier (upload d'image)
  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.addUtilisateurForm.get('image')?.setValue(file);
    }
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from 'src/app/interface/interface';
import { AuthService} from 'src/app/services/auth.service';
import { Contrat, ContratService } from '../contrat/services/contrat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | undefined;
  utilisateur: Utilisateur | undefined;
  contratChauffeur: Contrat | undefined;

  constructor(private contratService: ContratService, private authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
    });

     this.getTypeUtilisateur();
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/logout']);
  }

  //Recuperation de l'utilisateur connecter
  getTypeUtilisateur(){
    this.username = this.authService.getUsername()
    this.authService.getUnsernameToken(this.username!).subscribe({
      next:(response)=>{
        this.utilisateur = response;
        console.log(this.utilisateur);
         //Recuperation du contrat de l'utilisateur
        this.contratService.getContratChaufeur(this.utilisateur.id).subscribe({
          next:(response)=>{
            this.contratChauffeur = response;
            console.log(this.contratChauffeur);
          },
          error: ()=> console.log('Erreur de recuperation du contrat')
        })
      },
      error: ()=> console.log('Erreur de recuperation')
      
    })
  }

  
  

}

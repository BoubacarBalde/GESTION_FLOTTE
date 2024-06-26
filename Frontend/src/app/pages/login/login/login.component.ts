import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/nav-bar');
      },
      error: () => this.error = 'Error logging in'
    });
  }
  
  // login111(){
  //   this.authService.login11(this.username, this.password).subscribe({
  //     next:(response)=>{
  //        console.log(response);
  //     },
  //     error: () => this.error = 'Error logging in'
  //   })
  // }



}

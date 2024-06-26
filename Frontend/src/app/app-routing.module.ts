import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { LogoutComponent } from './pages/logout/logout/logout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AddChauffeurComponent } from './pages/chauffeur/add-chauffeur/add-chauffeur.component';
import { AddMotoComponent } from './pages/moto/add-moto/add-moto.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'nav-bar', component: NavbarComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'add-user', component: AddUserComponent},
  { path: 'add-chauffeur', component: AddChauffeurComponent},
  { path: 'add-moto', component: AddMotoComponent},
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'**', component: LoginComponent}
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

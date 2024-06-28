import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AuthInterceptor } from './intercerptors/auth.interceptor';
import { LoginComponent } from './pages/login/login/login.component';
import { LogoutComponent } from './pages/logout/logout/logout.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddChauffeurComponent } from './pages/chauffeur/add-chauffeur/add-chauffeur.component';
import { AddMotoComponent } from './pages/moto/add-moto/add-moto.component';
import { AddContratComponent } from './pages/contrat/add-contrat/add-contrat.component';
import { AddPanneComponent } from './pages/panne/add-panne/add-panne.component';
import { AddEntretientComponent } from './pages/entretien/add-entretient/add-entretient.component';
import { AddRecetteComponent } from './pages/recette/add-recette/add-recette.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    DashboardComponent,
    AddUserComponent,
    AddChauffeurComponent,
    AddMotoComponent,
    AddContratComponent,
    AddPanneComponent,
    AddEntretientComponent,
    AddRecetteComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    // AuthService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

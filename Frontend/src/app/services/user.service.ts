import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Utilisateur } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Assurez-vous de stocker votre token après l'authentification
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
}

  addManager(user: FormData): Observable<FormData>{
    return this.http.post<FormData>('http://127.0.0.1:8000/api/create-manager/', user, {headers: this.getAuthHeaders()})
  }

  addChauffeur(user: FormData): Observable<FormData> {
    return this.http.post<FormData>('http://127.0.0.1:8000/api/create-chauffeur/', user, {headers: this.getAuthHeaders()});
  }

  // addUtilisateurImage(user: FormData): Observable<FormData> {
  //   return this.http.post<FormData>('http://127.0.0.1:8000/api/create-utilisateurs-images/', user, {headers: this.getAuthHeaders()});
  // }
  
  // //Ajout des Utilisateurs
  // addUtilisateurs(user: FormData){
  //   return this.http.post<FormData>('http://127.0.0.1:8000/api/utilisateurs/', user, {headers: this.getAuthHeaders()})
  // }

  // //Modifications et suppression des Utilisateurs
  // updateDeleteUtilisateurs(id: number, user: FormData){
  //   return this.http.put<FormData>(`http://127.0.0.1:8000/api/utilisateurs/${id}/`, user, {headers: this.getAuthHeaders()})
  // }
  
  // Méthode pour ajouter la base URL à l'image
  private getFullImageUrl(imagePath: string): string {
    return `${this.baseUrl}${imagePath}`;
  }

  // Autres méthodes ...

  getChauffeur(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/list-chauffeur/', { headers: this.getAuthHeaders()})
      .pipe(
        map(users => users.map(user => ({
          ...user,
          image: user.image ? this.getFullImageUrl(user.image) : null
        })))
      );
  }

  getManagerChauffeur(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/managers-chauffeurs/', {headers: this.getAuthHeaders()})
      .pipe(
        map(users => users.map(user => ({
          ...user,
          image: user.image ? this.getFullImageUrl(user.image) : null
        })))
      );
  }


  getAdminManagers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/admin-managers/', {headers: this.getAuthHeaders()});
  }

  updateMangerChauffeur(id: number, user: FormData): Observable<FormData> {
    return this.http.put<FormData>(`http://127.0.0.1:8000/api/managerchauffeur/${id}/`, user, {headers: this.getAuthHeaders()});
  }

  deleteManagerChauffeur(id: number): Observable<FormData> {
    return this.http.delete<FormData>(`http://127.0.0.1:8000/api/managerchauffeur/${id}/`, {headers: this.getAuthHeaders()});
  }
  
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Utilisateur } from 'src/app/interface/interface';
import { Chauffeur } from '../../chauffeur/services/service-chauff.service';

export interface Moto {
  id:number;
  numero_serie: string;
  color: string;
  date_achat: string;
  chauffeur: number;
  image: string | null;
  created_by: number;
  modified_by: number;

}

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  // private baseUrl: string = 'http://127.0.0.1:8000';

  private apiUrl = 'http://127.0.0.1:8000/api/motos/';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Assurez-vous de stocker votre token après l'authentification
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
  }

  // // Méthode pour ajouter la base URL à l'image
  // private getFullImageUrl(imagePath: string): string {
  //   return `${this.baseUrl}${imagePath}`;
  // }

  // //recuperations de tout les motos
  // getAllMotos(): Observable<Moto[]> {
  //   return this.http.get<Moto[]>(this.apiUrl, { headers: this.getAuthHeaders()})
  //     .pipe(
  //       map(motos => motos.map(moto => ({
  //         ...moto,
  //         image: moto.image ? this.getFullImageUrl(moto.image) : null
  //     })))
  //   );
  // }

    //recuperations de tout les motos
    getAllMotos(): Observable<Moto[]> {
      return this.http.get<Moto[]>(this.apiUrl, { headers: this.getAuthHeaders()})
    }

  //Recuperation de tout les chauffeur dans la table utilisateur
  getChauffeur(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/list-chauffeur/', { headers: this.getAuthHeaders()})
  }



  //recuperations des manager et Admin
  getAdminManagers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/admin-managers/', {headers: this.getAuthHeaders()});
  }

   //recuperations de tous les utilisateurs
   getUserAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/list-utilisateurs/', {headers: this.getAuthHeaders()});
  }

  getMoto(id: number): Observable<Moto> {
    return this.http.get<Moto>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }

  addMoto(motoData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, motoData,{ headers: this.getAuthHeaders() });
  }

  updateMoto(id: number, motoData: FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.apiUrl}${id}/`, motoData, { headers: this.getAuthHeaders() });
  }

  deleteMoto(id: number): Observable<FormData> {
    return this.http.delete<FormData>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }
}

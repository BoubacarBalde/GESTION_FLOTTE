import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moto } from '../../moto/services/moto.service';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/interface/interface';

export interface Entretien {
  id: number;
  moto: number;  // ID de la moto
  type_entretien: string;
  date_entretion: string;  // Date en format ISO
  description: string;
  created_by: number // ID de l'utilisateur ou null
  modified_by: number // ID de l'utilisateur ou null
}


@Injectable({
  providedIn: 'root'
})
export class EntretienService {
private apiUrl = 'http://127.0.0.1:8000/api/entretiens/'

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Assurez-vous de stocker votre token après l'authentification
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
  }

  //recuperations de tout les motos
  getAllMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>('http://127.0.0.1:8000/api/motos/', { headers: this.getAuthHeaders()})
  }

  //Recuperation de tout les Entretiens
  getAllEntretion(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`${this.apiUrl}`,{ headers: this.getAuthHeaders() });
  }

  //recuperations des manager et Admin
  getAdminManagers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/admin-managers/', {headers: this.getAuthHeaders()});
  }

  //Recuperation d'un Entretiens
  getEntretien(id: number): Observable<Entretien> {
    return this.http.get<Entretien>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }

  addEntretion(entretienData: Entretien): Observable<Entretien> {
    return this.http.post<Entretien>(this.apiUrl, entretienData,{ headers: this.getAuthHeaders() });
  }

  updateEntretien(id: number, entretienData: Entretien): Observable<Entretien> {
    return this.http.put<Entretien>(`${this.apiUrl}${id}/`, entretienData, { headers: this.getAuthHeaders() });
  }

  deleteEntretien(id: number): Observable<Entretien> {
    return this.http.delete<Entretien>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moto } from '../../moto/services/moto.service';
import { Utilisateur } from 'src/app/interface/interface';

export interface Panne {
  id: number;
  moto: number;  // ID de la moto
  description: string;
  date_signalement: string;  // Date en format ISO
  etat: 'non_corrigee' | 'corrigee';
  created_by: number;
  modified_by: number;
}


@Injectable({
  providedIn: 'root'
})
export class PanneService {

  private apiUrl = 'http://127.0.0.1:8000/api/pannes/'

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

  //Recuperation de toute les pannes
  getAllPanne(): Observable<Panne[]> {
    return this.http.get<Panne[]>(`${this.apiUrl}`,{ headers: this.getAuthHeaders() });
  }

  //recuperations des manager et Admin
  getAdminManagers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/admin-managers/', {headers: this.getAuthHeaders()});
  }

  //Recuperation d'une Panne
  getPanne(id: number): Observable<Panne> {
    return this.http.get<Panne>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }

  addPanne(panneData: Panne): Observable<Panne> {
    return this.http.post<Panne>(this.apiUrl, panneData,{ headers: this.getAuthHeaders() });
  }

  updatePanne(id: number, pannetData: Panne): Observable<Panne> {
    return this.http.put<Panne>(`${this.apiUrl}${id}/`, pannetData, { headers: this.getAuthHeaders() });
  }

  deletePanne(id: number): Observable<Panne> {
    return this.http.delete<Panne>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }

}

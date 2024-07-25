import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/interface/interface';


export interface Recette {
  id: number;
  chauffeur: number; // ID du chauffeur
  date: string; // Date en format ISO
  montant: number; // Montant en décimal
  created_by: number // ID de l'utilisateur créateur ou null
  modified_by: number | null; // ID de l'utilisateur modificateur ou null
}


@Injectable({
  providedIn: 'root'
})
export class RectteService {

  private apiUrl = 'http://127.0.0.1:8000/api/recettes/'

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Assurez-vous de stocker votre token après l'authentification
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
  }

  //Recuperation de toute les Recettes
  getAllRecette(): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${this.apiUrl}`,{ headers: this.getAuthHeaders() });
  }

  //Recuperation de tout les chauffeur dans la table utilisateur
  getChauffeurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/list-chauffeur/', { headers: this.getAuthHeaders()})
  }

  //recuperations des manager et Admin
  getAdminManagers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/admin-managers/', {headers: this.getAuthHeaders()});
  }

  //Recuperation d'une Recette
  getRecette(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }

  addRectte(recetteData: Recette): Observable<Recette> {
    return this.http.post<Recette>(this.apiUrl, recetteData,{ headers: this.getAuthHeaders() });
  }

  updateRecette(id: number, recetteData: Recette): Observable<Recette> {
    return this.http.put<Recette>(`${this.apiUrl}${id}/`, recetteData, { headers: this.getAuthHeaders() });
  }

  deleteRecette(id: number): Observable<Recette> {
    return this.http.delete<Recette>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }
}


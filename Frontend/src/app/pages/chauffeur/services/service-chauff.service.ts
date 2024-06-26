import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Chauffeur {
  id: number;
  utilisteur: number;
  contrat_type: string;
  created_at: string;
  created_by: number;
  modified_at: string;
  modified_by: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceChauffService {
  private apiUrl = "http://127.0.0.1:8000/api/chauffeurs/";

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('access_token'); // Assurez-vous de stocker votre token après l'authentification
      return new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });
  }

  getChauffeurs(): Observable<Chauffeur[]> {
      return this.http.get<Chauffeur[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getChauffeur(id: number): Observable<Chauffeur> {
      return this.http.get<Chauffeur>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  createChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
      return this.http.post<Chauffeur>(this.apiUrl, chauffeur, { headers: this.getAuthHeaders() });
  }

  updateChauffeur(id: number, chauffeur: Chauffeur): Observable<Chauffeur> {
      return this.http.put<Chauffeur>(`${this.apiUrl}${id}/`, chauffeur, { headers: this.getAuthHeaders() });
  }

  deleteChauffeur(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }
}

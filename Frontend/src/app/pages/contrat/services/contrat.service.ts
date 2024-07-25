import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moto } from '../../moto/services/moto.service';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/interface/interface';


export interface Contrat {
  id: number;
  chauffeur: number;  // ID de l'utilisateur (chauffeur)
  moto: number;  // ID de la moto
  type_contrat: 'crédit' | 'embauche';
  montant_initial: number | null;  // Peut être null ou undefined
  montant_journalier: number;
  date_debut: string;  // Date en format ISO
  date_fin: string | null; // Peut être null ou undefined
  etat: 'en_cours' | 'termine' | 'annule';
  created_by: number | null;  // Peut être null ou undefined
  modified_by: number | null;  // Peut être null ou undefined
}


@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private apiUrl = 'http://127.0.0.1:8000/api/contrats/'

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

  //Recuperation de tout les chauffeur dans la table utilisateur
  getChauffeurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/list-chauffeur/', { headers: this.getAuthHeaders()})
  }

  //recuperations des manager et Admin
  getAdminManagers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>('http://127.0.0.1:8000/api/admin-managers/', {headers: this.getAuthHeaders()});
  }

   //recuperations du contrat d'un chauffeur existant
   getContratChaufeur(chauffeur: number): Observable<Contrat> {
    return this.http.get<Contrat>(`http://127.0.0.1:8000/api/contrats/chauffeur/${chauffeur}/`, {headers: this.getAuthHeaders()});
  }

  //Recuperation de tout les contrats
  getAllContrat(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiUrl}`,{ headers: this.getAuthHeaders() });
  }

  //Recuperation d'un contrat
  getContrat(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }

  addContrat(contratData: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(this.apiUrl, contratData,{ headers: this.getAuthHeaders() });
  }

  updateContrat(id: number, contratData: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.apiUrl}${id}/`, contratData, { headers: this.getAuthHeaders() });
  }

  deleteContrat(id: number): Observable<Contrat> {
    return this.http.delete<Contrat>(`${this.apiUrl}${id}/`,{ headers: this.getAuthHeaders() });
  }

}

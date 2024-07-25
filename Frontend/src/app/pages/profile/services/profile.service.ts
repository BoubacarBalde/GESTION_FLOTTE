import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Utilisateur } from 'src/app/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }
  

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Assurez-vous de stocker votre token après l'authentification
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
  }

  
   // Méthode pour ajouter la base URL à l'image
   private getFullImageUrl(imagePath: string): string {
    return `${this.baseUrl}${imagePath}`;
  }


  getUnsernameToken(username: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`http://127.0.0.1:8000/api/connexion/${username}/`, { headers: this.getAuthHeaders() })
      .pipe(
        map(user => ({
          ...user,
          image: user?.image ? this.getFullImageUrl(user.image) : null,
        }))
      );
    }


    updateUtilisateur(id: number, user: FormData): Observable<FormData> {
      return this.http.put<FormData>(`http://127.0.0.1:8000/api/managerchauffeur/${id}/`, user, {headers: this.getAuthHeaders()});
    }

}

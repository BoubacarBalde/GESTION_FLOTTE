import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utilisateur } from '../interface/interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private baseUrl: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token');
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);
  }

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

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/token/', { username, password }).pipe(
      map((response: any) => {
        if (response && response.access && response.refresh) {
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          localStorage.setItem('username', username);
          this.isLoggedInSubject.next(true);
        }
        return response;
      })
    );
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


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUsername(): string{
    if(this.isLoggedInSubject){
      return localStorage.getItem('username')!;
    }else{
      return localStorage.removeItem('username')!;
    }
  }

  getIdContratChauf(): string{
    if(this.isLoggedInSubject){
      return localStorage.getItem('username')!;
    }else{
      return localStorage.removeItem('username')!;
    }
  }
  
}

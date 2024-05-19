import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // End point pour l'authentification
  endPoint = environment.uri + '/api/authentification'

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // appelle un api pour se connecter et mettre le token recu dans le localstorage
  logIn(email: string, password: string):Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept' : 'application/json' });
    const body = JSON.stringify({ 
      "email": email,
      "password":  password
    });

    return this.http.post(this.endPoint + '/signin', body, { headers: header });
  }

  logOut() {
    // supprime le token du localstorage
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    // vérifie si le token existe dans le localstorage
    const promesse = new Promise<boolean>((resolve, reject) => {
      resolve(localStorage.getItem('token') !== null ? true : false);
    });

    return promesse;
  }

  isAdmin() {
    
  }

  getToken(){
    return localStorage.getItem('token');
  }

  onTokenError(responseError: any){
    if (responseError.status === 401) {
      localStorage.removeItem('token');
      this.router.navigate(['/signin']);
    }
  }


}

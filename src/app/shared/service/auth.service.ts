import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';

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
    this.router.navigate(['/signin']);
  }

  isLoggedIn() {
    // vérifie si le token existe dans le localstorage
    const promesse = new Promise<boolean>((resolve, reject) => {
      resolve(localStorage.getItem('token') !== null ? true : false);
    });

    return promesse;
  }

  isAdmin() {
    const promesse = new Promise<boolean>((resolve, reject) => {
      // decode le token en cours
      const decodedToken = this.decodeToken();
      if(decodedToken){
        // vérifie si l'utilisateur est admin
        resolve(decodedToken.role === 'administrateur'? true : false);
      }else{
        resolve(false);
      }
    });
    return promesse;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  decodeToken(): any {
    const token = this.getToken();
    if(token){
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }

  onTokenError(responseError: any){
    if (responseError.status === 401) {
      localStorage.removeItem('token');
      this.router.navigate(['/signin']);
    }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  // End point pour l'authentification
  endPoint = environment.uri + '/api/authentification'

  constructor(
    private http: HttpClient
  ) { }

  // appelle un api pour se connecter et mettre le token recu dans le localstorage
  logIn(email: string, password: string):Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 
      "email": email,
      "password":  password
    });

    return this.http.post(this.endPoint + '/signin', body, { headers: header });
  }
}

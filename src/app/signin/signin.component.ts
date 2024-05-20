import { Component } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  // Champs des formulaires d'authentification
  email: string = 'cooleyjames@example.org'
  password: string = 'Tn_rnb!='

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  loginSubmit(){
    // validation des formulaires d'authentification
    if(this.email == '' || this.password == '') return;

    // on s'authentifie et on met le token dans le localstorage
    this.authService.logIn(this.email, this.password).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    })
      
  }
}

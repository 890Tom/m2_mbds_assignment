import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { Assignment, Person } from '../shared/interface/assignment.interface';
import { AssignmentService } from '../shared/service/assignment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  user!: Person;

  constructor(
    private authService: AuthService,
    private assignmentService: AssignmentService,
  ) { }

  ngOnInit(): void {
    console.log(this.authService.getUser());
    
    this.user = this.authService.getUser() as Person;
    console.log(this.user);
  }

  signOut() {
    this.authService.logOut();
  }

  isAdmin(){
    // return this.authService.isAdmin().then(isAdmin=>{
    //   return isAdmin
    // });
  }
}

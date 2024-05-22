import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { Assignment } from '../shared/interface/assignment.interface';
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

  constructor(
    private authService: AuthService,
    private assignmentService: AssignmentService,
  ) { }

  ngOnInit(): void {
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

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { Assignment } from '../shared/interface/assignment.interface';
import { AssignmentService } from '../shared/service/assignment.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';

  // pour la pagination
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  // liste des assignments
  assignments: Assignment[] = [];

  constructor(
    private authService: AuthService,
    private assignmentService: AssignmentService,
  ) { }

  ngOnInit(): void {
    this.getAssignmentsFromService();
  }

  getAssignmentsFromService(){
    // on récupère les assignments depuis le service
    this.assignmentService.getAssignments(this.page, this.limit)
    .subscribe(
      (data)=>{
      // les données arrivent ici au bout d'un certain temps
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    });
  }

  signOut() {
    this.authService.logOut();
  }
}

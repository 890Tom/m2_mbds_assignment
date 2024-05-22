import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Assignment } from '../../shared/interface/assignment.interface';
import { AuthService } from '../../shared/service/auth.service';
import { AssignmentService } from '../../shared/service/assignment.service';

@Component({
  selector: 'app-list-assignment',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './list-assignment.component.html',
  styleUrl: './list-assignment.component.css'
})
export class ListAssignmentComponent implements OnInit {
  titre = 'Liste des assignments';

  // pour la pagination
  page = 1;
  limit = 4;
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

  // pour la pagination
  pagePrecedente(){
    this.page = this.prevPage;
    this.getAssignmentsFromService();
  }

  pageSuivante(){
    this.page = this.nextPage;
    this.getAssignmentsFromService();
  }

  premierePage(){
    this.page = 1;
    this.getAssignmentsFromService();
  }

  dernierePage(){
    this.page = this.totalPages;
    this.getAssignmentsFromService();
  }

  // supprimer un assignment et re afficher la liste
  onDelete(assignment: Assignment){
    // on va directement utiliser le service
    this.assignmentService.deleteAssignment(assignment)
    .subscribe( 
       message => {
        console.log(message);

        // actualiser la liste des assignments
        this.getAssignmentsFromService();
       }
    )
  }

  signOut() {
    this.authService.logOut();
  }
}
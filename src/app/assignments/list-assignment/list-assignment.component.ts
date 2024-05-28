import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Assignment } from '../../shared/interface/assignment.interface';
import { AuthService } from '../../shared/service/auth.service';
import { AssignmentService } from '../../shared/service/assignment.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import {  SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-assignment',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    SweetAlert2Module
  ],
  templateUrl: './list-assignment.component.html',
  styleUrl: './list-assignment.component.css'
})
export class ListAssignmentComponent implements OnInit {
  titre = 'Liste des assignments';

  // pour la pagination
  page = 1;
  limit = 20;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  // liste des assignments
  assignments: Assignment[] = [];
  assignmentsRendu: Assignment[] = [];
  assignmentsNonRendu: Assignment[] = [];

  faDelete = faDeleteLeft
  faEdit = faEdit;
  canEdit = true;
  isAdmin!: boolean;

  constructor(
    private authentificationService: AuthService,
    private assignmentService: AssignmentService,
    public dialog: MatDialog, 
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAssignmentsFromService();
  }

  /* openDialog(assignment: any, callback: () => void): void {
    const dialogRef = this.dialog.open(AssignmentModalComponent, {
      width: '250px',
      data: assignment,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update assignment with note and remark
        assignment.note = result.note;
        assignment.remarque = result.remarque;
        callback();
      }
    });
  } */

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const assignment = event.previousContainer.data[event.previousIndex];
      /* this.openDialog(assignment, () => {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }); */
    }
  }

  getAssignmentsFromService(){
    // on récupère les assignments depuis le service
    this.assignmentService.getAssignments(this.page, this.limit)
    .subscribe(
      (data)=>{
      // les données arrivent ici au bout d'un certain temps
      this.assignments = data.docs;

      // filter this.assignments by rendu = false
      this.assignmentsNonRendu = this.assignments.filter(assignment => !assignment.rendu);
      this.assignmentsRendu = this.assignments.filter(assignment => assignment.rendu);


      // on met à jour les variables de pagination

      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    });

    this.authentificationService.isAdmin().then(role => {
      this.isAdmin = role;
      this.canEdit = this.isAdmin;
    })
  }

  canDelete(assignment: Assignment){
    return this.isAdmin && !assignment.rendu;
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
        Swal.fire('Success', `Assignment ${assignment._id} is deleted`, 'success');
        // actualiser la liste des assignments
        this.getAssignmentsFromService();
       }
    )
  }

  signOut() {
    this.authentificationService.logOut();
  }
}

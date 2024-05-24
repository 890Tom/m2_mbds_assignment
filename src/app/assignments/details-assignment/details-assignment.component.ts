import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../shared/service/assignment.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Assignment } from '../../shared/interface/assignment.interface';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/service/auth.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-assignment',
  standalone: true,
  imports: [
    FontAwesomeModule, 
    SweetAlert2Module, 
    RouterModule,
    FormsModule],
  templateUrl: './details-assignment.component.html',
  styleUrl: './details-assignment.component.css'
})
export class DetailsAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  faCoffee = faCoffee;
  faDelete = faDeleteLeft
  faEdit = faEdit;
  canEdit = true;
  isAdmin!: boolean;

  constructor(
    private authentificationService: AuthService,
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const assignmentId = routeParams.get('assignment_id') as string;

    this.assignmentService.getAssignmentById(assignmentId).subscribe(assignment => { this.assignment = assignment; });
    this.authentificationService.isAdmin().then(role => { this.isAdmin = role; })

    this.canEdit = this.isAdmin && !this.assignment?.rendu;
  }

  onDelete(assignment: Assignment) {
    this.assignmentService.deleteAssignment(assignment)
      .subscribe(
        message => {
          Swal.fire('Success', `Assignment ${assignment._id} is deleted`, 'success');
          this.router.navigate(['/assignment/list']);
        }
      )
  }
}

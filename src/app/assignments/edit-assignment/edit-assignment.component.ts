import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Assignment } from '../../shared/interface/assignment.interface';
import { faCoffee, faDeleteLeft, faEdit, faSchool, faShip } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/service/auth.service';
import { AssignmentService } from '../../shared/service/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [FontAwesomeModule, SweetAlert2Module],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'
})
export class EditAssignmentComponent {
  assignment!: Assignment | undefined;
  faCoffee = faCoffee;
  faDelete = faDeleteLeft
  faEdit = faEdit;
  faSend = faSchool;
  canEdit = true;
  isAdmin!: boolean ;

  constructor(
    private authentificationService : AuthService,
    private assignmentService:  AssignmentService,
    private route : ActivatedRoute,
    private router : Router
  ) { }
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const assignmentId = routeParams.get('assignment_id') as string;

    this.assignmentService.getAssignmentById(assignmentId).subscribe(assignment => {  this.assignment = assignment; });
    this.authentificationService.isAdmin().then(role => { this.isAdmin = role ; })

    this.canEdit = this.isAdmin && !this.assignment?.rendu;
  }

  onDelete(assignment: Assignment){
    this.assignmentService.deleteAssignment(assignment)
    .subscribe( 
       message => {
        Swal.fire('Success', `Assignment ${assignment._id} is deleted`, 'success');
        this.router.navigate(['/assignment/list']);
       }
    )
  }
}

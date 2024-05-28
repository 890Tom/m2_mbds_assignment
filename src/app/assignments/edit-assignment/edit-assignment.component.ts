import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Assignment } from '../../shared/interface/assignment.interface';
import { faCoffee, faDeleteLeft, faEdit, faSchool, faShip } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/service/auth.service';
import { AssignmentService } from '../../shared/service/assignment.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [FontAwesomeModule, SweetAlert2Module, FormsModule, RouterModule],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'
})
export class EditAssignmentComponent {
  assignment!: Assignment;
  faCoffee = faCoffee;
  faDelete = faDeleteLeft
  faEdit = faEdit;
  faSend = faSchool;
  canEdit = true;
  isAdmin!: boolean;

  mark!: number;
  remarq!: string;

  constructor(
    private authentificationService: AuthService,
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const assignmentId = routeParams.get('assignment_id') as string;

    this.assignmentService.getAssignmentById(assignmentId).subscribe(assignment => {
      this.assignment = assignment;
      this.mark = this.assignment.note;
      this.remarq = this.assignment.remarque;
    });

    this.isUserAdmin().then(role => {
      this.isAdmin = role;
      this.canEdit = (this.isAdmin && !this.assignment?.rendu);
    })
  }

  async isUserAdmin(){
    const isAdmin = await this.authentificationService.isAdmin();
    return isAdmin;
  }

  onDelete() {
    this.assignmentService.deleteAssignment(this.assignment)
      .subscribe(
        message => {
          Swal.fire('Success', `Assignment ${this.assignment._id} is deleted`, 'success');
          this.router.navigate(['/assignment/list']);
        }
      )
  }

  onReturn() {
    if (!this.mark) Swal.fire('Error', `Please fill in the note first`, 'error');
    else {
      this.assignment.note = this.mark;
      this.assignment.remarque = this.remarq;
      this.assignment.rendu = true;
      this.assignment.dateRendu = new Date();


      this.assignmentService.returnAssignment(this.assignment).subscribe(
        message => {
          Swal.fire('Success', `Assignment ${this.assignment._id} is submited`, 'success');
          this.router.navigate(['/assignment/list']);
        }
      )
    }
  }

  onSave() {
    this.assignment.note = this.mark;
    this.assignment.remarque = this.remarq;
    
    this.assignmentService.updateAssignment(this.assignment)
    .subscribe(
      message => {
        Swal.fire('Success', `Assignment ${this.assignment._id} is updated`, 'success');
        this.router.navigate(['/assignment/list']);
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../shared/service/assignment.service';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../../shared/interface/assignment.interface';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details-assignment',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './details-assignment.component.html',
  styleUrl: './details-assignment.component.css'
})
export class DetailsAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  faCoffee = faCoffee;
  faDelete = faDeleteLeft
  faEdit = faEdit;

  constructor(
    private assignmentService: AssignmentService,
    private route : ActivatedRoute
  ) { }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const assignmentId = routeParams.get('assignment_id') as string;

    this.assignmentService.getAssignmentById(assignmentId).subscribe(assignment => {  this.assignment = assignment; });
  }
}

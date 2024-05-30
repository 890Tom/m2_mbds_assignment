import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Assignment } from '../../shared/interface/assignment.interface';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AssignmentService } from '../../shared/service/assignment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-return-assignment',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  templateUrl: './return-assignment.component.html',
  styleUrl: './return-assignment.component.css'
})
export class ReturnAssignmentComponent {
  // champ des formulaires
  note : number = 0;
  remarque: string = '';

  // font awesome
  faChoose = faPen;

  constructor(
    private formbuilder: FormBuilder,
    private assignmentService: AssignmentService,
    public dialogRef: MatDialogRef<ReturnAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Assignment,
  ){}

  formGroupe = this.formbuilder.group({
    note: ['', Validators.required],
    remarque: ['', Validators.required]
  });

  onNoClick(): void {
    // this.dialogRef.close()
  }

  rendreAssignment(){
    
    if (!this.note) {
      Swal.fire('Error', `Please fill in the note first`, 'error');
      return;
    }

    this.data.note = this.note;
    this.data.remarque = this.remarque;

    this.assignmentService.returnAssignment(this.data)
    .subscribe(
      (response) => {
        Swal.fire('Success', `Assignment ${this.data.nom} is submitted`, 'success');
        this.dialogRef.close({ success: true });
      },
      (error) => {
        this.dialogRef.close({ success: false});
      }
      // message => {
      //   Swal.fire('Success', `Assignment ${this.data.nom} is submitted`, 'success');
      //   return true;
      //   this.dialogRef.close();
      // }
    )
  }
  
}

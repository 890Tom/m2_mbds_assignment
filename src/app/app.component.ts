import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AssignmentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'm2_mbds_assignment';
}

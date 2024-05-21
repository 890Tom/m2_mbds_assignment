import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard } from './shared/guard/auth.guard';
import {AddAssignmentComponent} from './assignments/add-assignment/add-assignment.component';
export const routes: Routes = [
    {path: '', component: AssignmentsComponent, canActivate: [authGuard]},
    {path: 'signin', component: SigninComponent},
    {path: 'add-assignment', component: AddAssignmentComponent}
];
    
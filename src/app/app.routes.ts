import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
    {path: '', component: AssignmentsComponent},
    {path: 'signin', component: SigninComponent}
];
    
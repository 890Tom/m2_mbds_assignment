import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
    {path: '', component: AssignmentsComponent, canActivate: [authGuard]},
    {path: 'signin', component: SigninComponent}
];
    
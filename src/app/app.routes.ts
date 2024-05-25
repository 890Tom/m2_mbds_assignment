import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard } from './shared/guard/auth.guard';
import {AddAssignmentComponent} from './assignments/add-assignment/add-assignment.component';
import { DetailsAssignmentComponent } from './assignments/details-assignment/details-assignment.component';
import { ListAssignmentComponent } from './assignments/list-assignment/list-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';

export const routes: Routes = [
    {
        path: 'assignment', component: AssignmentsComponent, 
        canActivate: [authGuard],
        children: [
            {
                path:'list',
                component: ListAssignmentComponent
            },
            {
                path: 'details/:assignment_id', 
                component: DetailsAssignmentComponent 
            },
            {
                path: 'edit/:assignment_id', 
                component: EditAssignmentComponent 
            },
            {
                path: 'add', 
                component: AddAssignmentComponent
            }
        ]},
    {path: 'signin', component: SigninComponent},
    { path: '',   redirectTo: 'assignment/list', pathMatch: 'full' }
];
    
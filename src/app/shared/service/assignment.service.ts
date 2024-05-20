import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../interface/assignment.interface';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  // End point pour les assignments
  endPoint = environment.uri + '/api/assignments'

  constructor(
    private http: HttpClient
  ) { }

  getAssignments(page: number, limit: number):Observable<any> {
    return this.http.get<Assignment[]>(this.endPoint + "?page=" + page + "&limit=" + limit);
  }

  deleteAssignment(assignment: Assignment): Observable<any>{
    const body = JSON.stringify({
      "id" : assignment._id
    })
    return this.http.delete(this.endPoint + '/delete',{body: body})
  }
}

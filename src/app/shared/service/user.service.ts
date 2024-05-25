import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endPoint = environment.uri + '/api/users/students'

  constructor(
    private http: HttpClient
  ) { }

  getAllStudents(page: number, limit: number):Observable<any> {
    return this.http.get<User[]>(this.endPoint + "?page=" + page + "&limit=" + limit);
  }
}

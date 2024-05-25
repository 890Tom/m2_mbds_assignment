import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from '../interface/assignment.interface';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  endPoint = environment.uri + '/api/matieres'

  constructor(
    private http: HttpClient
  ) { }

  getAllMatieres(page: number, limit: number):Observable<any> {
    return this.http.get<Matiere[]>(this.endPoint + "?page=" + page + "&limit=" + limit);
  }
}

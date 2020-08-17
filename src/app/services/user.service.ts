import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import {environment} from 'src/environments/environment' ;
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class PostService {

private baseUrl = environment.apiUrlReqRes + 'api/users';

  constructor( private apiService: ApiService) { }
  getUsers(): Observable<any> {
    return this.apiService.get( this.baseUrl,  new HttpParams());

  }

  getUserById(id: string): Observable<any> {
    return this.apiService.get(`${this.baseUrl}/${id}`, new HttpParams());

  }

  deleteUser(id: string): Observable<User> {
    return this.apiService.delete(`${this.baseUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.apiService.post(`${this.baseUrl}`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.apiService.put(`${this.baseUrl}/${id}`, user);
  }

  saveUser(user: User): Observable<User> {
    if(user.id) {
      return this.apiService.put(`${this.baseUrl}/${user.id}`, user);
    }
    return this.apiService.post(`${this.baseUrl}`, user);
  }



  
}
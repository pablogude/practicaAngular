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
export class UserService {

private baseUrl = environment.apiUrlReqRes + '/api';

  constructor( private apiService: ApiService) { }
  getUsers(): Observable<any> {
    return this.apiService.get( `${this.baseUrl}/users`,  new HttpParams());

  }

  getUserById(id: string): Observable<any> {
    return this.apiService.get(`${this.baseUrl}/users/${id}`, new HttpParams());

  }

  deleteUser(id: string): Observable<User> {
    return this.apiService.delete(`${this.baseUrl}/users/${id}`);
  }

  registerUser(user: User): Observable<User> {
    return this.apiService.post(`${this.baseUrl}/register`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.apiService.put(`${this.baseUrl}/users/${id}`, user);
  }

  loginUser(user: User): Observable<User> {
    return this.apiService.post(`${this.baseUrl}/login`, user);
  }

  
}
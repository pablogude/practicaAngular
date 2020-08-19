import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import {environment} from 'src/environments/environment' ;
import { Post } from '../models/post';
@Injectable({
  providedIn: 'root'
})
export class PostService {

private baseUrl = environment.apiUrlJsonPlaceholder + '/posts';

  constructor( private apiService: ApiService) { }
  getPosts(): Observable<any> {
    return this.apiService.get( this.baseUrl,  new HttpParams());

  }

  getMyPosts(id: string): Observable<any> {
    return this.apiService.get( `${this.baseUrl}/?userId=${id}`,  new HttpParams());
    
  }

  getPostById(id: string): Observable<any> {
    return this.apiService.get(`${this.baseUrl}/${id}`, new HttpParams());

  }

  deletePost(id: string): Observable<Post> {
    return this.apiService.delete(`${this.baseUrl}/${id}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.apiService.post(`${this.baseUrl}`, post);
  }

  updatePost(id: string, post: Post): Observable<Post> {
    return this.apiService.put(`${this.baseUrl}/${id}`, post);
  }

  savePost(post: Post): Observable<Post> {
    if(post.id) {
      return this.apiService.put(`${this.baseUrl}/${post.id}`, post);
    }
    return this.apiService.post(`${this.baseUrl}`, post);
  }



  
}
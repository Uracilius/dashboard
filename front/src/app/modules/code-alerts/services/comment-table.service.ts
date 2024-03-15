import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class CommentTableService {

  constructor(private http: HttpClient) { }

  getComments(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/comments');
  }
}

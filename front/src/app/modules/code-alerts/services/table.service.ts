import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getComments(page: number = 1, pageSize: number = 10, filePath: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/comments`, { page, pageSize, filePath });
  }
  
  getFileList(page: number, pageSize: number = 10): Observable<any> { // Adjust the return type based on your actual data structure
    return this.http.post<any>(`http://localhost:3000/fileList`, { page, pageSize });
  }
}
 
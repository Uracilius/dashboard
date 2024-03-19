import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alertStatistics } from '../models/DTOs';

@Injectable({
  providedIn: 'root'
})
export class CodeAlertsApiService {
  path = 'http://localhost:3000/'
  //TODO MULTIPLE filePath should be changed to id upon migration to database 
  constructor(private http: HttpClient) { }
  getAlerts(page: number = 1, pageSize: number = 10, filePath: string): Observable<any> {
    return this.http.post<any>(this.path+`alerts`, { page, pageSize, filePath });
  }
  
  getFileList(page: number, pageSize: number = 10): Observable<any> { // Adjust the return type based on your actual data structure
    return this.http.post<any>(this.path+`fileList`, { page, pageSize });
  }
  //TODO filePath should be changed to id upon migration to database 
  getCode(id: string): Observable<any> { 
    return this.http.post<any>(this.path+`code`, { id });
  }

  getAlertStatistics(): Observable<alertStatistics> {
    return this.http.get<alertStatistics>(this.path+`alertStatistics`);
  }

}
 
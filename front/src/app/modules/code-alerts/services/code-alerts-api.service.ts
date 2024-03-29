import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertDTO, alertStatistics } from '../models/DTOs';

@Injectable({
  providedIn: 'root'
})
export class CodeAlertsApiService {
  path = 'http://localhost:3000/'
  id='uracilius'
  //TODO MULTIPLE filePath should be changed to id upon migration to database 
  constructor(private http: HttpClient) { }
  getAlerts(page: number = 1, pageSize: number = 10, filePath: string): Observable<AlertDTO> {
    return this.http.post<AlertDTO>(this.path+`alerts`, { page, pageSize, filePath });
  }
  
  getFileList(page: number, pageSize: number = 10, fileNameFilter: string): Observable<any> { // Adjust the return type based on your actual data structure
    return this.http.post<any>(this.path+`fileList`, { page, pageSize, fileNameFilter });
  }
  //TODO filePath should be changed to id upon migration to database 
  getCode(id: string): Observable<any> { 
    return this.http.post<any>(this.path+`code`, { id });
  }

  getAlertStatistics(): Observable<alertStatistics> {
    return this.http.get<alertStatistics>(this.path+`alertStatistics`);
  }

  getLeetCodeData(): Observable<any> {
    return this.http.get<any>(`${this.path}leetcode/${this.id}`);
  }

}
 
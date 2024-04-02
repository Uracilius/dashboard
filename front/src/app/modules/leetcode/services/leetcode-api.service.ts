import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeetCodeApiService {
  path = 'http://localhost:3000/'
  id='uracilius'
  
  constructor(private http: HttpClient) { }
  

  getLeetCodeData(): Observable<any> {
    return this.http.get<any>(`${this.path}leetcode/${this.id}`);
  }
  getLeetCodeCalendar(): Observable<any> {
    return this.http.get<any>(`${this.path}leetcode/calendar/${this.id}`);
  }

}
 
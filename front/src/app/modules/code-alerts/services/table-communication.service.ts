import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableCommunicationService {
  selectedCode$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  selectedFileList$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  
  fileNameFilter$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  constructor() { }
}

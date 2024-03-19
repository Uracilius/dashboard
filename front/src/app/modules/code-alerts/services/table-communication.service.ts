import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableCommunicationService {
  selectedComment$ = new BehaviorSubject<string>('');
  selectedFileList$ = new BehaviorSubject<string>('');
  fileNameFilter$ = new BehaviorSubject<string>('');
  numOfFiles$ = new BehaviorSubject<number>(0);
  constructor() { }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosCommunicationService {
  selectedCode$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor() { }
}

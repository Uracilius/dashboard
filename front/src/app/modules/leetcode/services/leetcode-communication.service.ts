import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeStampSubmission } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class LeetcodeCommunicationService {
  calendarData$ = new BehaviorSubject<TimeStampSubmission[]>([]);
  constructor() { }
}
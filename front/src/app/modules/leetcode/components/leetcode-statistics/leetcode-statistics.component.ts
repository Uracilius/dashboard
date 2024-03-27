import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeetCodeApiService } from '../../services/leetcode-api.service';
import { LeetcodeData, TimeStampSubmission } from '../../models/dto';
import { Subscription } from 'rxjs';
import { LeetcodeCommunicationService } from '../../services/leetcode-communication.service';

@Component({
  selector: 'app-leetcode-statistics',
  templateUrl: './leetcode-statistics.component.html',
  styleUrls: ['./leetcode-statistics.component.css']
})
export class LeetcodeStatisticsComponent implements OnInit {
  leetcodeData: LeetcodeData = {} as LeetcodeData;
  subs: Subscription[] = [];
  username: string = 'uracilius';
  constructor(
    private apiService: LeetCodeApiService,
    private communicationService: LeetcodeCommunicationService
    ) {}

  ngOnInit() {
    this.getLeetCodeData();
  }

  getLeetCodeData() {
    this.apiService.getLeetCodeData().subscribe({
      next: (res: LeetcodeData) => {
        this.leetcodeData = res;
        this.calendarData = this.parseSubmissionCalendar();
      }
    });
  }

  set calendarData(value: TimeStampSubmission[]) {
    this.communicationService.calendarData$.next(value);
  }

  parseSubmissionCalendar(): TimeStampSubmission[] {
    const submissionData = this.leetcodeData.submissionCalendar;
    const submissions: TimeStampSubmission[] = Object.entries(submissionData).map(([timestamp, submissionCount]) => ({
      timestamp: new Date(parseInt(timestamp, 10) * 1000),
      submissionCount: submissionCount as unknown as number
    }));
    
    return submissions;
}
}

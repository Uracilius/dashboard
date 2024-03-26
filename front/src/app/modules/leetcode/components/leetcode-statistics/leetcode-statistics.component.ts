import { Component } from '@angular/core';
import { LeetCodeApiService } from '../../services/leetcode-api.service';
import { LeetcodeData } from '../../models/dto';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-leetcode-statistics',
  templateUrl: './leetcode-statistics.component.html',
  styleUrls: ['./leetcode-statistics.component.css']
})
export class LeetcodeStatisticsComponent {
  leetcodeData: LeetcodeData = {} as LeetcodeData; // Initialize as an empty object
  subs: Subscription[]=[];
  username: string = 'uracilius';
  submissionCalendarSvg: string = '';
  trustedSvgContent: SafeHtml = '';
  constructor(private apiService: LeetCodeApiService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getLeetCodeData();
    this.getLeetCodeCalendar();
  }

  getLeetCodeData() {
    this.apiService.getLeetCodeData().subscribe({
      next: (res: LeetcodeData) => {
        this.leetcodeData = res;
      }
    }); 
  }

  getLeetCodeCalendar() {
    this.apiService.getLeetCodeCalendar().subscribe({
      next: (res: any) => {
        this.submissionCalendarSvg = res.svg;
        this.trustedSvgContent = this.sanitizer.bypassSecurityTrustHtml(this.submissionCalendarSvg);
        console.log(this.trustedSvgContent)
      }
    });
  }
}

import { Component } from '@angular/core';
import { LeetCodeApiService } from '../../services/leetcode-api.service';
import { LeetcodeData } from '../../models/dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leetcode-statistics',
  templateUrl: './leetcode-statistics.component.html',
  styleUrls: ['./leetcode-statistics.component.css']
})
export class LeetcodeStatisticsComponent {
  leetcodeData: LeetcodeData = {} as LeetcodeData; // Initialize as an empty object
  subs: Subscription[]=[];
  username: string = 'uracilius';
  constructor(private apiService: LeetCodeApiService) {}
  
  ngOnInit() {
    this.getLeetCodeData();
  }

  getLeetCodeData() {
    this.apiService.getLeetCodeData().subscribe({
      next: (res: LeetcodeData) => {
        this.leetcodeData = res;
      }
    }); 
  }

}

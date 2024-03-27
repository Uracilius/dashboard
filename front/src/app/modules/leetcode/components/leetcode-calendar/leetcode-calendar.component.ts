import { Component } from '@angular/core';
import CalHeatmap from 'cal-heatmap';
import { TimeStampSubmission } from '../../models/dto';
import { Subscription } from 'rxjs';
import { LeetcodeCommunicationService } from '../../services/leetcode-communication.service';

@Component({
  selector: 'app-leetcode-calendar',
  templateUrl: './leetcode-calendar.component.html',
  styleUrls: ['./leetcode-calendar.component.css']
})
export class LeetcodeCalendarComponent {
  calendar: any; // Type as any if CalHeatMap is not recognized
  calendarData: TimeStampSubmission[] = [];
  subs: Subscription[] = [];

  constructor(
    private communicationService: LeetcodeCommunicationService
  ) 
  {}
  
  ngOnInit() {
    this.initSubscribe();
  }
  
  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe())
  }

  initCalendar() {
    this.calendar = new CalHeatmap();
    this.paintCalendar();
  }

  initSubscribe() {
    this.subs.push(this.communicationService.calendarData$.subscribe({
      next: (res) => {
        this.calendarData = res;
        this.initCalendar();
      }
    }));
  }

  paintCalendar() {
    // Ensure data is available
    
    
    // Initialize heatmap
    this.calendar = new CalHeatmap();
    const container = document.querySelector('#cal-heatmap'); // Ensure this element exists in your template
    if (!container) {
      console.error('Heatmap container not found');
      return;
    }

    const nCat = 10; 
    let values = this.calendarData.map(item => item.submissionCount);
    let valMax = Math.max(...values);
    let valMin = Math.min(...values);
    let diff = valMax - valMin;
    let div = diff / nCat;
    let legend = [];
    legend[0] = valMin;
    for (let i = nCat - 1; i >= 0; i--) {
      legend[i] = valMax - (nCat - 1 - i) * div;
    }

    
    const options = {
      itemSelector: '#cal-heatmap',
      domain: {
        type: 'month',
      },
      rowLimit: 24,
      cellSize: 20,
      domainGutter: 0,
      subDomain: {
        label: 'DD',
        type: 'day',
      },
      data: {
        source: this.calendarData,
        defaultValue: 0,
        x: "timestamp",
        y: "submissionCount",
      },
      date: {
        start: this.calendarData[0].timestamp,
        end: this.calendarData[this.calendarData.length - 1].timestamp,
        locale: { weekStart: 1 } 
      },
      legend:legend,
      range: 12,
      scale:{
        color: {
          domain: legend,
          range: ["white","#e0ecf8","#e0ecf7","#dfebf7","#deebf7","#ddeaf7","#ddeaf6","#dce9f6","#dbe9f6","#dae8f6","#d9e8f5","#d9e7f5","#d8e7f5","#d7e6f5","#d6e6f4","#d6e5f4","#d5e5f4","#d4e4f4","#d3e4f3","#d2e3f3","#d2e3f3","#d1e2f3","#d0e2f2","#cfe1f2","#cee1f2","#cde0f1","#cce0f1","#ccdff1","#cbdff1","#cadef0","#c9def0","#c8ddf0","#c7ddef","#c6dcef","#c5dcef","#c4dbee","#c3dbee","#c2daee","#c1daed","#c0d9ed","#bfd9ec","#bed8ec","#bdd8ec","#bcd7eb","#bbd7eb","#b9d6eb","#b8d5ea","#b7d5ea","#b6d4e9","#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5","#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1","#9ac7e1","#99c6e1","#97c6e0","#96c5e0","#94c4df","#93c3df","#91c3df","#90c2de","#8ec1de","#8dc0de","#8bc0dd","#8abfdd","#88bedc","#87bddc","#85bcdc","#84bbdb","#82bbdb","#81badb","#7fb9da","#7eb8da","#7cb7d9","#7bb6d9","#79b5d9","#78b5d8","#76b4d8","#75b3d7","#73b2d7","#72b1d7","#70b0d6","#6fafd6","#6daed5","#6caed5","#6badd5","#69acd4","#68abd4","#66aad3","#65a9d3","#63a8d2","#62a7d2","#61a7d1","#5fa6d1","#5ea5d0","#5da4d0","#5ba3d0","#5aa2cf","#59a1cf","#57a0ce","#569fce","#559ecd","#549ecd","#529dcc","#519ccc","#509bcb","#4f9acb","#4d99ca","#4c98ca","#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"],
          type: "quantize"
        }
      },
    };

    this.calendar.paint(options);
    console.log(this.calendar.options.options);
  }

  transformData(submissionCalendar: any): Record<number, number> {
    return Object.entries(submissionCalendar).reduce((acc: Record<number, number>, [timestamp, count]) => {
      const timeInSeconds = Math.floor(parseInt(timestamp, 10));
      acc[timeInSeconds] = count as number; // Ensure count is treated as a number
      return acc;
    }, {});
  }
}

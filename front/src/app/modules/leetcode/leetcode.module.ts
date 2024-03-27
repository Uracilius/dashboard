import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeAlertsRoutingModule } from '../code-alerts/code-alerts-routing.module';
import { MaterialModule } from 'src/assets/material/material.module';
import { LeetcodeMainComponent } from './leetcode-main/leetcode-main.component';
import { LeetcodeStatisticsComponent } from './components/leetcode-statistics/leetcode-statistics.component';
import { LeetcodeCalendarComponent } from './components/leetcode-calendar/leetcode-calendar.component';
import { LeetcodeRoutingModule } from './leetcode-routing.module';



@NgModule({
  declarations: [
    LeetcodeMainComponent,
    LeetcodeStatisticsComponent,
    LeetcodeCalendarComponent
  ],
  imports: [
    CommonModule,
    LeetcodeRoutingModule,
    MaterialModule,
  ]
})
export class LeetcodeModule { }

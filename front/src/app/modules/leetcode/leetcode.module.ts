import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeAlertsRoutingModule } from '../code-alerts/code-alerts-routing.module';
import { MaterialModule } from 'src/assets/material/material.module';
import { LeetcodeStatisticsComponent } from './components/leetcode-statistics/leetcode-statistics.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CodeAlertsRoutingModule,
    MaterialModule,
  ]
})
export class LeetcodeModule { }

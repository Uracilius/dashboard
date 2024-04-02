import { Component } from '@angular/core';
import { CodeAlertsApiService } from '../../services/code-alerts-api.service';
import { alertStatistics } from '../../models/DTOs';
import { TableCommunicationService } from '../../services/table-communication.service';
@Component({
  selector: 'app-code-alerts-statistics',
  templateUrl: './code-alerts-statistics.component.html',
  styleUrls: ['./code-alerts-statistics.component.css']
})
export class CodeAlertsStatisticsComponent {
  alertStatistics: alertStatistics = {numOfAlerts: 0};
  constructor(
    private CodeAlertsApiService: CodeAlertsApiService,
    private communicationService: TableCommunicationService
  ) 
  {}

  ngOnInit() {
    this.populateStatistics();
  }

  populateStatistics() {
    this.CodeAlertsApiService.getAlertStatistics().subscribe({
      next: (res: alertStatistics) => {
        this.alertStatistics = res;
        this.setNumOfFiles$();
      }
    });
  }

  setNumOfFiles$(){
    this.communicationService.numOfFiles$.next(this.alertStatistics.numOfAlerts);
  }
}

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
  alertStatistics: alertStatistics = {numOfFiles: 0,statusStatisticsList: []};
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

  getTotalAlerts(): number {
    return this.alertStatistics.statusStatisticsList.reduce((total, statusStat) => total + statusStat.numOfAlerts, 0);
  }

  setNumOfFiles$(){
    this.communicationService.numOfFiles$.next(this.alertStatistics.numOfFiles);
  }
}

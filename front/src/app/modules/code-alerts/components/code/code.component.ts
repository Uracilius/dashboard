import { Component } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';
import { CodeAlertsApiService } from '../../services/code-alerts-api.service';
import { UserFeedbackConstants } from '../../constants/user-feedback-constants';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent {
  subs: Subscription[] = [];
  code: string = '';
  defaultCodeMessage = UserFeedbackConstants.noCodeSelected;
  constructor(
    private tableCommunicationService: TableCommunicationService,
    private codeAlertsApiService: CodeAlertsApiService
  ) 
  {}

  ngOnInit() {
    this.initSubscribe()
  }

  initSubscribe() {
    this.subs.push(
      this.tableCommunicationService.selectedComment$.subscribe({
        next: (res) => {
          this.getCode(res)
        }
      })
    )
  }

  getCode(filePath: string) {
      if(filePath !== '') {
      this.subs.push(
        this.codeAlertsApiService.getCode(filePath).subscribe({
          next: (res) => {
            this.code=res.code.replace(/\\n/g, '\n');;
          }
        })
      )
    }
    else {
      this.code = this.defaultCodeMessage;
    }
  }
}

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
  subs: Subscription[] = []
  code: string = ''
  defaultCodeMessage = UserFeedbackConstants.noCodeSelected
  constructor(
    private tableCommunicationService: TableCommunicationService,
    private CodeAlertsApiService: CodeAlertsApiService
  ) 
  {}

  ngOnInit() {
    this.initSubscribe()
  }

  initSubscribe() {
    this.subs.push(
      this.tableCommunicationService.selectedComment$.pipe(
      filter(comment => comment.trim() !== '') // Only emit non-empty comments
      ).subscribe({
        next: (res) => {
          this.getCode(res)
        }
      })
    )
  }

  getCode(filePath: string) {
    this.subs.push(
      this.CodeAlertsApiService.getCode(filePath).subscribe({
        next: (res) => {
          this.code=res.text.replace(/\\n/g, '\n');;
        }
      })
    )
  }
}

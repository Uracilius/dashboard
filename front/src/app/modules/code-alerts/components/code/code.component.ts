import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent {
  subs: Subscription[] = []
  code: string = ''
  constructor(
    private communicationService: TableCommunicationService,
  ) 
  {}

  ngOnInit() {
    this.initSubscribe()
  }

  initSubscribe() {
    this.subs.push(
      this.communicationService.selectedCode$.subscribe({
        next: (res) => {
          this.code = res
        }
      })
    )
  }

}

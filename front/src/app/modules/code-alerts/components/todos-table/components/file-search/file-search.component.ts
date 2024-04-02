import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';

@Component({
  selector: 'app-file-search',
  templateUrl: './file-search.component.html',
  styleUrls: ['./file-search.component.css']
})
export class FileSearchComponent {
  constructor(
    private communicationService: TableCommunicationService
  ) 
  {}

  onSubmit() {
    if (this.fileNameFilter.value !== null) {
      this.communicationService.fileNameFilter$.next(this.fileNameFilter.value);
    }
  }
  fileNameFilter = new FormControl('');
}

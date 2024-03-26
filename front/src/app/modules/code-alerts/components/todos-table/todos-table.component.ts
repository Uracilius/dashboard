import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';
import { PaginationConstants } from 'src/app/modules/code-alerts/constants/pagination-constants';
import { CodeAlertsApiService } from 'src/app/modules/code-alerts/services/code-alerts-api.service';
import { AlertDTO } from '../../models/DTOs';

@Component({
  selector: 'app-todos-table',
  templateUrl: './todos-table.component.html',
  styleUrls: ['./todos-table.component.css']
})
export class TodosTableComponent {
  SampleItemsList: AlertDTO[] = [];
  filteredItemList: AlertDTO[] = [];
  subs: Subscription[] = [];
  pageSize= PaginationConstants.pageSize;
  displayedColumns: string[] = ['filePath', 'status', 'meta'];
  selectedFile = '';
  selectedRowIndex: number = -1;

  
  onRowClicked(row: any,  index: number) {
    this.selectedRowIndex = index;
    this.selectedComment = row.id;
  }

  ngOnInit() {
    this.initSubscribe();
  }
  
  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe())
  }

  constructor(
    private communicationService: TableCommunicationService,
    private CodeAlertsApiService: CodeAlertsApiService
  ) 
  {
    this.filteredItemList = [...this.SampleItemsList];
  }

  populateTable() {
    this.subs.push(this.CodeAlertsApiService.getAlerts(1, 5, this.selectedFile).subscribe({
      next: (res: any) => {
        this.SampleItemsList = res.data;
        this.filteredItemList = res.data;
      }
    }));
  }

  set selectedComment(value: string) {
    this.communicationService.selectedComment$.next(value);
  }
  
  get paginatedItems() {
    return this.SampleItemsList.slice(PaginationConstants.startIndex, PaginationConstants.endIndex);
  }

  initSubscribe() {
    this.subs.push(this.communicationService.selectedFileList$.subscribe({
      next: (res) => {
        this.selectedFile = res;
        this.selectedComment='';
        this.populateTable();
        this.selectedRowIndex = -1;
      }
    }));
  }

  onPageChange(event: any) {
    PaginationConstants.startIndex = event.pageIndex * event.pageSize;
    PaginationConstants.endIndex = PaginationConstants.startIndex + event.pageSize;
  }
}

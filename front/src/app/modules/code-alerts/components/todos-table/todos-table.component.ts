import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';
import { Todo } from '../../models/todo'; 
import { PaginationConstants } from 'src/app/modules/code-alerts/constants/pagination-constants';
import { TableService } from 'src/app/modules/code-alerts/services/table.service';

@Component({
  selector: 'app-todos-table',
  templateUrl: './todos-table.component.html',
  styleUrls: ['./todos-table.component.css']
})
export class TodosTableComponent {
  SampleItemsList: Todo[] = [];
  filteredItemList: Todo[] = [];
  subs: Subscription[] = [];
  pageSize= PaginationConstants.pageSize;
  displayedColumns: string[] = ['filePath', 'status', 'meta'];
  selectedFile = '';
  
  onRowClicked(row: any) {
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
    private TableService: TableService
  ) 
  {
    this.filteredItemList = [...this.SampleItemsList];
  }

  populateTable() {
    this.subs.push(this.TableService.getComments(1, 5, this.selectedFile).subscribe({
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
        this.selectedFile = res
        this.populateTable();
      }
    }));
  }

  onPageChange(event: any) {
    PaginationConstants.startIndex = event.pageIndex * event.pageSize;
    PaginationConstants.endIndex = PaginationConstants.startIndex + event.pageSize;
  }
}

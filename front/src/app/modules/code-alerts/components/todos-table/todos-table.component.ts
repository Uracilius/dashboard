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

  onRowClicked(row: any) {
    this.selectedCode = row.text;
  }

  ngOnInit() {
    this.establishConnection();
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

  establishConnection() {
    this.subs.push(this.TableService.getComments().subscribe((comments) => {
      this.SampleItemsList = comments;
      this.filteredItemList = comments;
    }));
  }
  set selectedCode(value: string) {
    this.communicationService.selectedCode$.next(value);
  }
  
  get paginatedItems() {
    return this.SampleItemsList.slice(PaginationConstants.startIndex, PaginationConstants.endIndex);
  }

  onPageChange(event: any) {
    PaginationConstants.startIndex = event.pageIndex * event.pageSize;
    PaginationConstants.endIndex = PaginationConstants.startIndex + event.pageSize;
  }

  applyFilter(target: EventTarget | null, filterBy: string) {    
    const filterValueLower = (target as HTMLInputElement).value.toLowerCase();
    if (filterBy === 'status') {
      this.filteredItemList = this.SampleItemsList.filter(item => item.status.toLowerCase().includes(filterValueLower));
    }
  }
}

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodosCommunicationService } from 'src/app/modules/code-alerts/services/todos-communication.service';
import { Todo } from '../../../../models/todo'; 
import { PaginationConstants } from 'src/app/modules/code-alerts/constants/pagination-constants';
@Component({
  selector: 'app-todos-table',
  templateUrl: './todos-table.component.html',
  styleUrls: ['./todos-table.component.css']
})
export class TodosTableComponent {
  SampleItemsList: Todo[] = [ 
    { numOfLines: 5, status: "AWAIT", text: "//AWAIT additional directives regarding healing people\nlet heal=0\nheal=5", meta: "awaiting healing" },
    { numOfLines: 5, status: "AWAIT", text: "//AWAIT additional directives regarding code completions, reactive forms etc.\nhello=\"helloworld\"", meta: "awaiting directives" },
    { numOfLines: 5, status: "AWAIT", text: "//AWAIT additional directives regarding holding people\nlet hold=0\nhold=5", meta: "awaiting holding" }
  ];
  filteredItemList: Todo[] = [];
  subs: Subscription[] = [];
  pageSize= PaginationConstants.pageSize;
  displayedColumns: string[] = ['numOfLines', 'status', 'meta'];

  onRowClicked(row: any) {
    this.selectedCode = row.text;
  }
  
  constructor(
    private communicationService: TodosCommunicationService,
  ) 
  {
    this.filteredItemList = [...this.SampleItemsList];
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
    } else if (filterBy === 'numOfLines') {
      const num = parseInt((target as HTMLInputElement).value, 10);
      this.filteredItemList = this.SampleItemsList.filter(item => item.numOfLines >= num);
    }
  }
  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe())
  }

}

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
    this.selectedCode = row.text;
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

  establishConnection() {
    console.log('Attempting to establish connection with:', this.selectedFile);
    this.subs.push(this.TableService.getComments(1, 5, this.selectedFile).subscribe((comments) => {
      console.log('Received comments:', comments);
      this.SampleItemsList = comments.data;
      this.filteredItemList = comments.data;
    }, error => {
      console.error('Error fetching comments:', error);
    }));
  }

  set selectedCode(value: string) {
    this.communicationService.selectedCode$.next(value);
  }
  
  get paginatedItems() {
    return this.SampleItemsList.slice(PaginationConstants.startIndex, PaginationConstants.endIndex);
  }

  initSubscribe() {
    this.subs.push(this.communicationService.selectedFileList$.subscribe({
      next: (res) => {
        this.selectedFile = res
        console.log('SELECTED FILE CHANGED TO', this.selectedFile)
        this.establishConnection();
      }
    }));
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

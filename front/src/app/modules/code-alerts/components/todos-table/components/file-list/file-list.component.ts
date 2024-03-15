import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';
import { TableService } from 'src/app/modules/code-alerts/services/table.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  subs: Subscription[] = [];
  fileList: string[] = [];
  fileNameFilter: string = '';
  constructor(
    private communicationService: TableCommunicationService,
    private TableService: TableService
  ) { }

  ngOnInit() {
    this.populateList();
    this.initSubscribe();
  }
  
  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe())
  }

  rowClick(index: number){
    console.log('row clicked', this.fileList[index]);
  }

  populateList() {
    this.subs.push(this.TableService.getFileList().subscribe({
      next: (res) => {
        this.fileList = res;
      }
    }));
  }

  initSubscribe() {
    this.subs.push(this.communicationService.fileNameFilter$.subscribe({
      next: (res) => {
        this.fileNameFilter = res
        this.filterFileList();
      }
    }));
  }

  filterFileList() {
    if (this.fileNameFilter) {
      this.fileList = this.fileList.filter(file => file.includes(this.fileNameFilter));
    }
  }
}

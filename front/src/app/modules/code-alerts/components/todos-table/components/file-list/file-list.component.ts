import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PathNameGeneratorService } from 'src/app/modules/code-alerts/services/path-name-generator.service';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';
import { CodeAlertsApiService } from 'src/app/modules/code-alerts/services/code-alerts-api.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  currentPage: number = 1;
  pageSize: number = 5;
  subs: Subscription[] = [];
  fileDisplayList: string [] = [];
  fileList: string[] = [];
  fileNameFilter: string = '';
  selectedRowIndex: number | null = null;
  numOfFiles=0;
  isRenderNextButton = false;
  isRenderPreviousButton = false;
  constructor(
    private communicationService: TableCommunicationService,
    private CodeAlertsApiService: CodeAlertsApiService,
    private pathNameGeneratorService: PathNameGeneratorService
  ) { }

  ngOnInit() {
    this.populateList();
    this.initSubscribe();
  }
  
  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe())
  }

  rowClick(index: number){
    this.selectedRowIndex = index;
    this.communicationService.selectedFileList$.next(this.fileList[index]);
  }
  //TODO: Check for better implementation instead of using rowClick to display first.
  populateList() {
    this.subs.push(this.CodeAlertsApiService.getFileList(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.fileList = res.data; 
        this.pathNameGeneratorService.processPaths(res.data);
        this.fileDisplayList = this.pathNameGeneratorService.generateDynamicDisplayPaths(res.data);
        this.calculateDisablePrevious();
        this.calculateDisableNext();
        this.rowClick(0);
      }
    }));
  }

  nextPage() {
    this.currentPage++;
    this.populateList();
  }

  previousPage() {
    this.currentPage--;
    this.populateList();
  }

  initSubscribe() {
    this.subs.push(this.communicationService.fileNameFilter$.subscribe({
      next: (res) => {
        this.fileNameFilter = res
        this.filterFileList();
      }
    }));

    this.subs.push(this.communicationService.numOfFiles$.subscribe({
      next: (res) => {
        this.numOfFiles = res
      }
    }));
  }

  calculateDisableNext() {
    const lastItemIndex = this.currentPage * this.pageSize;
    this.isRenderNextButton = this.numOfFiles >= lastItemIndex;
  }

  calculateDisablePrevious(): void {
    this.isRenderPreviousButton = this.currentPage !== 1;
  }

  filterFileList() {
    if (this.fileNameFilter) {
      this.fileList = this.fileList.filter(file => file.includes(this.fileNameFilter));
    }
  }
}

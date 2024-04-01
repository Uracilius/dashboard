import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PathNameGeneratorService } from 'src/app/modules/code-alerts/services/path-name-generator.service';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';
import { CodeAlertsApiService } from 'src/app/modules/code-alerts/services/code-alerts-api.service';
import { FilteredFileNames } from 'src/app/modules/code-alerts/models/DTOs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  currentPage: number = 0;
  pageSize: number = 5;
  subs: Subscription[] = [];
  fileDisplayList: string [] = [];
  filteredFileList: FilteredFileNames = {
    files: [],
    page: 0,
    pageSize: 5
  };
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
    this.communicationService.selectedFileList$.next(this.filteredFileList.files[index].filePath);
  }
  //TODO: Check for better implementation instead of using rowClick to display first.
  populateList() {
    this.subs.push(this.CodeAlertsApiService.getFileList(this.currentPage, this.pageSize, this.fileNameFilter).subscribe({
      next: (res) => {
        this.filteredFileList = res; 
        this.pathNameGeneratorService.processPaths(this.filteredFileList.files);
        this.fileDisplayList = this.pathNameGeneratorService.generateDynamicDisplayPaths(this.filteredFileList.files);
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
        this.fileNameFilter = res;
        this.populateList();
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
    this.isRenderPreviousButton = this.currentPage !== 0;
  }
}

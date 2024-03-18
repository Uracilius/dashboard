import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PathNameGeneratorService } from 'src/app/modules/code-alerts/services/path-name-generator.service';
import { TableCommunicationService } from 'src/app/modules/code-alerts/services/table-communication.service';
import { TableService } from 'src/app/modules/code-alerts/services/table.service';

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
  constructor(
    private communicationService: TableCommunicationService,
    private TableService: TableService,
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
    this.subs.push(this.TableService.getFileList(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.fileList = res.data; 
        this.pathNameGeneratorService.processPaths(res.data);
        this.fileDisplayList = this.pathNameGeneratorService.generateDynamicDisplayPaths(res.data);
        this.rowClick(0); //Simulation of rowClick in case of singular files to make it look bearable 
      }
    }));
  }

  nextPage() {
    this.currentPage++;
    this.populateList();
  }

  previousPage() {
    this.currentPage = Math.max(1, this.currentPage - 1);
    this.populateList();
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

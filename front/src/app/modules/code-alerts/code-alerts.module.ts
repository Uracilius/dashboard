import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeAlertsRoutingModule } from './code-alerts-routing.module';
import { CodeAlertsMainComponent } from './components/code-alerts-main/code-alerts-main.component';
import { MaterialModule } from 'src/assets/material/material.module';
import { CodeComponent } from './components/code/code.component';
import { TodosTableComponent } from './components/todos-table/todos-table.component';
import { HighlightCodeDirective } from './directives/highlight-code.directive';
import { FileListComponent } from './components/todos-table/components/file-list/file-list.component';
import { FileSearchComponent } from './components/todos-table/components/file-search/file-search.component';


@NgModule({
  declarations: [
    CodeAlertsMainComponent,
    TodosTableComponent,
    CodeComponent,
    FileListComponent,
    FileSearchComponent,
    HighlightCodeDirective,
  ],
  imports: [
    CommonModule,
    CodeAlertsRoutingModule,
    MaterialModule,
  ],
  providers: [
  ],
})
export class CodeAlertsModule { }

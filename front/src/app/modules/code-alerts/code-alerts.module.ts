import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeAlertsRoutingModule } from './code-alerts-routing.module';
import { CodeAlertsMainComponent } from './components/code-alerts-main/code-alerts-main.component';
import { MaterialModule } from 'src/assets/material/material.module';
import { CodeComponent } from './components/show-todos/component/code/code.component';
import { TodosTableComponent } from './components/show-todos/component/todos-table/todos-table.component';
import { TodosComponent } from './components/show-todos/todos.component';
import { HighlightCodeDirective } from './directives/highlight-code.directive';


@NgModule({
  declarations: [
    TodosComponent,
    CodeAlertsMainComponent,
    TodosTableComponent,
    CodeComponent,
    HighlightCodeDirective,
  ],
  imports: [
    CommonModule,
    CodeAlertsRoutingModule,
    MaterialModule,
  ]
})
export class CodeAlertsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './components/show-todos/todos.component';
import { CodeAlertsMainComponent } from './components/code-alerts-main/code-alerts-main.component';

const routes: Routes = [
  {
    path: '', component: CodeAlertsMainComponent,
  },
  {
    path: 'todos', component: TodosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeAlertsRoutingModule { }

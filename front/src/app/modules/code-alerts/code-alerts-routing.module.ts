import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeAlertsMainComponent } from './components/code-alerts-main/code-alerts-main.component';

const routes: Routes = [
  {
    path: '', component: CodeAlertsMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeAlertsRoutingModule { }

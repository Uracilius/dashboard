import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeMainComponent } from './resume-main/resume-main.component';

const routes: Routes = [
  {
    path: '', component: ResumeMainComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResumeRoutingModule { }

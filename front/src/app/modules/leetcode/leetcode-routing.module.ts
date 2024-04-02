import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeetcodeMainComponent } from './leetcode-main/leetcode-main.component';
const routes: Routes = [
  {
    path: '', component: LeetcodeMainComponent,
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
export class LeetcodeRoutingModule { }

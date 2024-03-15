import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/code-alerts',
    pathMatch: 'full'
  },
  {
    path: 'code-alerts',
    loadChildren: () => import('./modules/code-alerts/code-alerts.module').then(m => m.CodeAlertsModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
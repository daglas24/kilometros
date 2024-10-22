import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecuperarconPage } from './recuperarcon.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarconPageRoutingModule {}

import { RouterModule, Routes } from '@angular/router';

import { ApprovalComponent } from './approval.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ApprovalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalRoutingModule {}

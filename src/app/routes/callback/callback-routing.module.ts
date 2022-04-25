import { RouterModule, Routes } from '@angular/router';

import { CallbackComponent } from './callback.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: CallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallbackRoutingModule {}

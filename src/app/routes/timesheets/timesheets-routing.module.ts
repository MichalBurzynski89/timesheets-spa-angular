import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TimesheetAddComponent } from './components/timesheet-add/timesheet-add.component';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetListComponent,
  },
  {
    path: 'add',
    component: TimesheetAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimesheetsRoutingModule {}

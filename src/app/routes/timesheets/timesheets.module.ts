import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TimesheetAddComponent } from './components/timesheet-add/timesheet-add.component';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TimesheetListComponent, TimesheetAddComponent],
})
export class TimesheetsModule {}

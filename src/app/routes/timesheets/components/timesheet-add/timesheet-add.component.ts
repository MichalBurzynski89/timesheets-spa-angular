import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetModel } from 'src/app/models/timesheet.model';
import { TimesheetsService } from 'src/app/services/timesheets.service';

@Component({
  selector: 'app-timesheet-add',
  templateUrl: './timesheet-add.component.html',
  styleUrls: ['./timesheet-add.component.scss'],
})
export class TimesheetAddComponent {
  error!: string;
  model: TimesheetModel = new TimesheetModel();

  constructor(
    private readonly router: Router,
    private readonly timesheetsService: TimesheetsService
  ) {}

  onSubmit() {
    this.timesheetsService.addTimesheet(this.model).subscribe({
      next: () => this.router.navigate(['/timesheets']),
      error: error => (this.error = error.statusText),
    });
  }
}

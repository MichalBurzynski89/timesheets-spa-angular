import { Component, OnInit } from '@angular/core';

import { TimesheetModel } from 'src/app/models/timesheet.model';
import { TimesheetsService } from 'src/app/services/timesheets.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss'],
})
export class TimesheetListComponent implements OnInit {
  timesheets!: TimesheetModel[];
  error!: string;

  constructor(private readonly timesheetsService: TimesheetsService) {}

  ngOnInit() {
    this.timesheetsService.getAllTimesheets().subscribe({
      next: data => (this.timesheets = data),
      error: error => (this.error = error.statusText),
    });
  }
}

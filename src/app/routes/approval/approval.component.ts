import { Component, OnInit } from '@angular/core';

import { TimesheetModel } from 'src/app/models/timesheet.model';
import { TimesheetsService } from 'src/app/services/timesheets.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent implements OnInit {
  timesheets!: TimesheetModel[];
  error!: string;

  constructor(private readonly timesheetsService: TimesheetsService) {}

  ngOnInit(): void {
    this.timesheetsService.getUnapprovedTimesheets().subscribe({
      next: data => (this.timesheets = data),
      error: error => (this.error = error.statusText),
    });
  }

  approve(id: number): void {
    this.timesheetsService.approveTimesheet(id).subscribe({
      next: () => (this.timesheets = this.timesheets.filter(x => x.id !== id)),
      error: error => (this.error = error.statusText),
    });
  }
}

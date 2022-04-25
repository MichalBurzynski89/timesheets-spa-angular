import { AUTH_CONFIG } from '../auth/auth0-variables';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimesheetModel } from '../models/timesheet.model';

@Injectable()
export class TimesheetsService {
  constructor(private readonly http: HttpClient) {}

  addTimesheet(model: TimesheetModel): Observable<TimesheetModel> {
    return this.http.post<TimesheetModel>(
      `${AUTH_CONFIG.apiUrl}/timesheets`,
      JSON.stringify(model)
    );
  }

  getAllTimesheets(): Observable<TimesheetModel[]> {
    return this.http.get<TimesheetModel[]>(`${AUTH_CONFIG.apiUrl}/timesheets`);
  }

  getUnapprovedTimesheets(): Observable<TimesheetModel[]> {
    return this.http.get<TimesheetModel[]>(`${AUTH_CONFIG.apiUrl}/approvals`);
  }

  approveTimesheet(id: number): Observable<TimesheetModel> {
    return this.http.put<TimesheetModel>(
      `${AUTH_CONFIG.apiUrl}/approvals/${id}`,
      {}
    );
  }
}

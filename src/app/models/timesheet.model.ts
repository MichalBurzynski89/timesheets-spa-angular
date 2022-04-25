export class TimesheetModel {
  id!: number;
  user_id!: string;
  date!: Date;
  project!: string;
  hours!: number;
  approved!: boolean;
}

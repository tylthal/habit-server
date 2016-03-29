export interface IDay {
    date: Date;
    required: boolean; // indicates if the habit needs to be done on this day
    completed: boolean;
}

var DAYS: Array<string> = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export class Day implements IDay {
  date: Date;
  required: boolean;
  completed: boolean;

  constructor(date: Date) {
    this.date = date;
    this.required = true; // TODO: at some point we want to be able to add schedules to habits
  }

  getDayStr() {
    return DAYS[this.date.getDay()] + ' (' + this.date.getDate() + ')';
  }
}

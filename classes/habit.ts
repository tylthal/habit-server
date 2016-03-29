import {IDay, Day} from "./day";

export interface IHabit {
  id: number;
  name: string;
  description: string;
  currentWeek?: Array<IDay>;
}

export class Habit implements IHabit {
  id: number;
  name: string;
  description: string;
  currentWeek: Array<Day>

  constructor(name: string, description: string, first: Date) {
    this.name = name;
    this.description = description;
    this.currentWeek = new Array<Day>();

    this.currentWeek.push(new Day(first));
    this.currentWeek.push(new Day(new Date(first.getFullYear(), first.getMonth(), first.getDate() + 1)));
    this.currentWeek.push(new Day(new Date(first.getFullYear(), first.getMonth(), first.getDate() + 2)));
    this.currentWeek.push(new Day(new Date(first.getFullYear(), first.getMonth(), first.getDate() + 3)));
    this.currentWeek.push(new Day(new Date(first.getFullYear(), first.getMonth(), first.getDate() + 4)));
    this.currentWeek.push(new Day(new Date(first.getFullYear(), first.getMonth(), first.getDate() + 5)));
    this.currentWeek.push(new Day(new Date(first.getFullYear(), first.getMonth(), first.getDate() + 6)));
  }
}

import {IHabit, Habit} from './habit';

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  habits: IHabit[];
}

export class Category implements ICategory {
  id: string;
  name: string;
  description: string;
  habits: Habit[];

  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export enum TaskPriorityEnum {
  VERY_HIGH = 'Very High',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  VERY_LOW = 'Very Low',
}

export enum TaskDifficultyEnum {
  VERY_HARD = 'Very Hard',
  HARD = 'Hard',
  MEDIUM = 'Medium',
  EASY = 'Easy',
  VERY_EASY = 'Very Easy',
}

export enum TaskSectionEnum {
  Today = 'Today',
  Recommended = 'Recommended',
  Habits = 'Habits',
}

export interface Task {
  _id: string;
  name: string;
  description: string;
  deadline?: Date;
  schedule: Date;
  prerequisites: [];
  subTask: string[];
  isHabit: boolean;
  isDone?: boolean;
  difficulty: TaskDifficultyEnum;
  priority: TaskPriorityEnum;
  color?: string;
}

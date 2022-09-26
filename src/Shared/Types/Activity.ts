export enum ActivityPriorityEnum {
  VERY_HIGH = 'Very High',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  VERY_LOW = 'Very Low',
}

export enum ActivityDifficultyEnum {
  VERY_HARD = 'Very Hard',
  HARD = 'Hard',
  MEDIUM = 'Medium',
  EASY = 'Easy',
  VERY_EASY = 'Very Easy',
}

export interface Activity {
  _id: string;
  name: string;
  description?: string;
  priority: ActivityPriorityEnum;
  deadline?: Date;
  difficulty: ActivityDifficultyEnum;
  schedule?: Date;
  prerequisites: string[];
  subTask: string[];
  isHabit?: boolean;
  isDone?: boolean;
}

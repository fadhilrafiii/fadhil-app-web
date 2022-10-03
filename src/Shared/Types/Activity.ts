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
  description: string;
  deadline?: Date;
  schedule?: Date;
  prerequisites: [];
  subTask: string[];
  isHabit: boolean;
  isDone?: boolean;
  difficulty: ActivityDifficultyEnum;
  priority: ActivityPriorityEnum;
  color?: string;
}

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

export interface ActivityField {
  name: string;
  description?: string;
  deadline?: Date;
  schedule?: Date;
  difficulty: ActivityDifficultyEnum | null;
  priority: ActivityPriorityEnum | null;
  prerequisites: string[];
  subTask: string[];
  isHabit?: boolean;
  isDone?: boolean;
}
export interface Activity extends ActivityField {
  _id: string;
  difficulty: ActivityDifficultyEnum;
  priority: ActivityPriorityEnum;
}

import { ActivityDifficultyEnum, ActivityPriorityEnum } from 'Shared/Types/Activity';
import { Option } from 'Shared/Types/Option';

export const ACTIVITY_DIFFICULTY_OPTIONS: Option[] = [
  {
    label: ActivityDifficultyEnum.VERY_HARD,
    value: ActivityDifficultyEnum.VERY_HARD,
  },
  {
    label: ActivityDifficultyEnum.HARD,
    value: ActivityDifficultyEnum.HARD,
  },
  {
    label: ActivityDifficultyEnum.MEDIUM,
    value: ActivityDifficultyEnum.MEDIUM,
  },
  {
    label: ActivityDifficultyEnum.EASY,
    value: ActivityDifficultyEnum.EASY,
  },
  {
    label: ActivityDifficultyEnum.VERY_EASY,
    value: ActivityDifficultyEnum.VERY_EASY,
  },
];

export const ACTIVITY_PRIORITY_OPTIONS: Option[] = [
  {
    label: ActivityPriorityEnum.VERY_HIGH,
    value: ActivityPriorityEnum.VERY_HIGH,
  },
  {
    label: ActivityPriorityEnum.HIGH,
    value: ActivityPriorityEnum.HIGH,
  },
  {
    label: ActivityPriorityEnum.MEDIUM,
    value: ActivityPriorityEnum.MEDIUM,
  },
  {
    label: ActivityPriorityEnum.LOW,
    value: ActivityPriorityEnum.LOW,
  },
  {
    label: ActivityPriorityEnum.VERY_LOW,
    value: ActivityPriorityEnum.VERY_LOW,
  },
];

export const ACTIVITY_TYPE_OPTIONS: Option[] = [
  {
    label: 'Habits',
    value: 'Habits',
  },
  {
    label: 'One Time Task',
    value: 'One Time Task',
  },
];

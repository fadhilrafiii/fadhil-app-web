import { Option } from 'Shared/Types/Option';
import { TaskDifficultyEnum, TaskPriorityEnum, TaskSectionEnum } from 'Shared/Types/Task';

export const TASK_DIFFICULTY_OPTIONS: Option[] = [
  {
    label: TaskDifficultyEnum.VERY_HARD,
    value: TaskDifficultyEnum.VERY_HARD,
  },
  {
    label: TaskDifficultyEnum.HARD,
    value: TaskDifficultyEnum.HARD,
  },
  {
    label: TaskDifficultyEnum.MEDIUM,
    value: TaskDifficultyEnum.MEDIUM,
  },
  {
    label: TaskDifficultyEnum.EASY,
    value: TaskDifficultyEnum.EASY,
  },
  {
    label: TaskDifficultyEnum.VERY_EASY,
    value: TaskDifficultyEnum.VERY_EASY,
  },
];

export const TASK_PRIORITY_OPTIONS: Option[] = [
  {
    label: TaskPriorityEnum.VERY_HIGH,
    value: TaskPriorityEnum.VERY_HIGH,
  },
  {
    label: TaskPriorityEnum.HIGH,
    value: TaskPriorityEnum.HIGH,
  },
  {
    label: TaskPriorityEnum.MEDIUM,
    value: TaskPriorityEnum.MEDIUM,
  },
  {
    label: TaskPriorityEnum.LOW,
    value: TaskPriorityEnum.LOW,
  },
  {
    label: TaskPriorityEnum.VERY_LOW,
    value: TaskPriorityEnum.VERY_LOW,
  },
];

export const TASK_TYPE_OPTIONS: Option[] = [
  {
    label: 'Habits',
    value: 'Habits',
  },
  {
    label: 'One Time Task',
    value: 'One Time Task',
  },
];

export const TASK_SECTION_OPTIONS_LABEL: Record<TaskSectionEnum, string> = {
  [TaskSectionEnum.Today]: 'Today Task',
  [TaskSectionEnum.Recommended]: 'Recommended To Do',
  [TaskSectionEnum.Habits]: 'My Habits',
};

export const TASK_SECTION_OPTIONS: Option[] = [
  {
    label: TASK_SECTION_OPTIONS_LABEL[TaskSectionEnum.Today],
    value: TaskSectionEnum.Today,
  },
  {
    label: TASK_SECTION_OPTIONS_LABEL[TaskSectionEnum.Recommended],
    value: TaskSectionEnum.Recommended,
  },
  {
    label: TASK_SECTION_OPTIONS_LABEL[TaskSectionEnum.Habits],
    value: TaskSectionEnum.Habits,
  },
];

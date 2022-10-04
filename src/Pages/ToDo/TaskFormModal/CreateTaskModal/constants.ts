import dayjs from 'Shared/Helpers/datetime';
import { TaskDifficultyEnum, TaskPriorityEnum } from 'Shared/Types/Task';

import { TaskFormField } from '../types';

export const TASK_FORM_ENTRIES: TaskFormField = {
  name: {
    value: '',
    errorMessage: '',
    required: true,
  },
  description: {
    value: '',
    errorMessage: '',
    required: true,
  },
  priority: {
    value: TaskPriorityEnum.MEDIUM,
    errorMessage: '',
    required: true,
  },
  difficulty: {
    value: TaskDifficultyEnum.MEDIUM,
    errorMessage: '',
    required: true,
  },
  schedule: {
    value: dayjs().toDate(),
    errorMessage: '',
    required: true,
  },
  deadline: {
    value: undefined,
    errorMessage: '',
  },
  prerequisites: {
    value: [],
    errorMessage: '',
  },
  subTask: {
    value: [],
    errorMessage: '',
  },
  isHabit: {
    value: false,
    errorMessage: '',
  },
};

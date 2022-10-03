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
    value: undefined,
    errorMessage: '',
    required: true,
  },
  deadline: {
    value: undefined,
    errorMessage: '',
  },
  difficulty: {
    value: undefined,
    errorMessage: '',
    required: true,
  },
  schedule: {
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

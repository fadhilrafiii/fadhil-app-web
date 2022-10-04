import { FormField } from 'Shared/Types/Form';
import { TaskDifficultyEnum, TaskPriorityEnum } from 'Shared/Types/Task';

export interface TaskFormField {
  name: FormField<string>;
  description: FormField<string>;
  priority: FormField<TaskPriorityEnum>;
  deadline: FormField<Date | undefined>;
  difficulty: FormField<TaskDifficultyEnum>;
  schedule: FormField<Date>;
  prerequisites: FormField<[]>;
  subTask: FormField<string[]>;
  isHabit: FormField<boolean>;
}

import { ActivityDifficultyEnum, ActivityPriorityEnum } from 'Shared/Types/Activity';
import { FormField } from 'Shared/Types/Form';

export interface TaskFormField {
  name: FormField<string>;
  description: FormField<string>;
  priority: FormField<ActivityPriorityEnum | undefined>;
  deadline: FormField<Date | undefined>;
  difficulty: FormField<ActivityDifficultyEnum | undefined>;
  schedule: FormField<Date | undefined>;
  prerequisites: FormField<[]>;
  subTask: FormField<string[]>;
  isHabit: FormField<boolean>;
}

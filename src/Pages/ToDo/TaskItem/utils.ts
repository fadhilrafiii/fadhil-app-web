import { Colors } from 'Shared/Types/Colors';
import { TaskDifficultyEnum, TaskPriorityEnum } from 'Shared/Types/Task';

export const getPriorityColor = (priority: TaskPriorityEnum) => {
  switch (priority) {
    case TaskPriorityEnum.VERY_HIGH:
    case TaskPriorityEnum.HIGH:
      return Colors.DestructiveLight;
    case TaskPriorityEnum.MEDIUM:
      return Colors.Warning;
    case TaskPriorityEnum.LOW:
    case TaskPriorityEnum.VERY_LOW:
      return Colors.Success;
  }
};

export const getDifficultyColor = (priority: TaskDifficultyEnum) => {
  switch (priority) {
    case TaskDifficultyEnum.VERY_HARD:
    case TaskDifficultyEnum.HARD:
      return Colors.DestructiveLight;
    case TaskDifficultyEnum.MEDIUM:
      return Colors.Warning;
    case TaskDifficultyEnum.EASY:
    case TaskDifficultyEnum.VERY_EASY:
      return Colors.Success;
  }
};

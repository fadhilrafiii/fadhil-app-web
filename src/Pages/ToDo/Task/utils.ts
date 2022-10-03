import { ActivityDifficultyEnum, ActivityPriorityEnum } from 'Shared/Types/Activity';
import { Colors } from 'Shared/Types/Colors';

export const getPriorityColor = (priority: ActivityPriorityEnum) => {
  switch (priority) {
    case ActivityPriorityEnum.VERY_HIGH:
    case ActivityPriorityEnum.HIGH:
      return Colors.DestructiveLight;
    case ActivityPriorityEnum.MEDIUM:
      return Colors.Warning;
    case ActivityPriorityEnum.LOW:
    case ActivityPriorityEnum.VERY_LOW:
      return Colors.Success;
  }
};

export const getDifficultyColor = (priority: ActivityDifficultyEnum) => {
  switch (priority) {
    case ActivityDifficultyEnum.VERY_HARD:
    case ActivityDifficultyEnum.HARD:
      return Colors.DestructiveLight;
    case ActivityDifficultyEnum.MEDIUM:
      return Colors.Warning;
    case ActivityDifficultyEnum.EASY:
    case ActivityDifficultyEnum.VERY_EASY:
      return Colors.Success;
  }
};

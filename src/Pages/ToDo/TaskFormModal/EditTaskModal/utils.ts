import { useState } from 'react';

import { showSnackbar } from 'Redux/Slices/snackbarSlice';

import { editTask, EditTaskPayload } from 'Clients/task/edit';

import { TASK_TYPE_OPTIONS } from 'Shared/Constants/Task';
import { OptionValue } from 'Shared/Types/Option';
import { Task } from 'Shared/Types/Task';

import { TaskFormField } from '../types';
import { useAppDispatch } from './../../../../Redux/hooks';

interface UseEditTaskFormProps {
  initialData: Task;
  onEditTask: () => void;
}

export const useEditTaskForm = ({ initialData, onEditTask }: UseEditTaskFormProps) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [taskEntries, setTaskEntries] = useState<TaskFormField>({
    name: {
      value: initialData.name,
      errorMessage: '',
      required: true,
    },
    description: {
      value: initialData.description,
      errorMessage: '',
      required: true,
    },
    priority: {
      value: initialData.priority,
      errorMessage: '',
      required: true,
    },
    difficulty: {
      value: initialData.difficulty,
      errorMessage: '',
      required: true,
    },
    schedule: {
      value: initialData.schedule,
      errorMessage: '',
      required: true,
    },
    deadline: {
      value: initialData.deadline,
      errorMessage: '',
    },
    prerequisites: {
      value: [],
      errorMessage: '',
    },
    subTask: {
      value: initialData.subTask,
      errorMessage: '',
    },
    isHabit: {
      value: initialData.isHabit,
      errorMessage: '',
    },
  });

  const handleChangeTextInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTaskEntries((prev: TaskFormField) => ({
      ...prev,
      [name]: { ...prev[name as keyof TaskFormField], value },
    }));
  };

  const handleChangeSelectField = (name: string, value: OptionValue) => {
    setTaskEntries((prev: TaskFormField) => ({
      ...prev,
      [name]: { ...prev[name as keyof TaskFormField], value },
    }));
  };

  const actionAddSubTask = (newSubTask: string) => {
    if (!newSubTask) return;

    setTaskEntries((prev: TaskFormField) => ({
      ...prev,
      subTask: {
        ...prev.subTask,
        value: [...prev.subTask.value, newSubTask],
      },
    }));
  };

  const actionRemoveSubTask = (taskIndex: number) => {
    setTaskEntries((prev: TaskFormField) => ({
      ...prev,
      subTask: {
        ...prev.subTask,
        value: prev.subTask.value.filter((val: string, index: number) => index !== taskIndex),
      },
    }));
  };

  const handleChangeDateTimeField = (name: keyof TaskFormField, value: Date) => {
    setTaskEntries((prev: TaskFormField) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
      },
    }));
  };

  const handleChangeRadioField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTaskEntries((prev: TaskFormField) => ({
      ...prev,
      isHabit: {
        ...prev.isHabit,
        value: value === TASK_TYPE_OPTIONS[0].value,
      },
    }));
  };

  const handleOnBlurField = (name: keyof TaskFormField) => {
    const entry = taskEntries[name];
    if (entry.required) {
      setTaskEntries((prev: TaskFormField) => ({
        ...prev,
        [name]: {
          ...prev[name],
          errorMessage: prev[name].value ? '' : `${name} is required!`,
        },
      }));
    }
  };

  const validateFormField = () => {
    const keys: string[] = Object.keys(taskEntries);
    const invalidInputNames = keys.filter((key: string) => {
      const entry = taskEntries[key as keyof TaskFormField];

      return entry.required && !entry.value;
    });

    return {
      isValid: invalidInputNames.length === 0,
      invalidInputNames,
    };
  };

  const actionClickEditTask = () => {
    const { isValid, invalidInputNames } = validateFormField();
    if (!isValid) {
      const invalidInputEntries: Record<string, unknown> = {};
      invalidInputNames.forEach((key: string) => {
        invalidInputEntries[key] = {
          ...taskEntries[key as keyof TaskFormField],
          errorMessage: `${key} field is required!`,
        };
      });

      setTaskEntries((prev: TaskFormField) => ({
        ...prev,
        ...invalidInputEntries,
      }));
      return;
    }
    handleSubmitEditTaskForm();
  };

  const handleSubmitEditTaskForm = async () => {
    setIsLoading(true);
    const payload: EditTaskPayload = {
      name: taskEntries.name.value.trim(),
      description: taskEntries.description.value.trim(),
      priority: taskEntries.priority.value,
      difficulty: taskEntries.difficulty.value,
      subTask: taskEntries.subTask.value,
      schedule: taskEntries.schedule.value,
      deadline: taskEntries.deadline.value,
      isHabit: taskEntries.isHabit.value,
    };

    await editTask(initialData._id, payload)
      .then(() => {
        dispatch(
          showSnackbar({
            text: 'Success create task!',
          }),
        );
        onEditTask();
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    taskEntries,
    handleChangeTextInputField,
    handleChangeSelectField,
    handleChangeDateTimeField,
    handleChangeRadioField,
    handleOnBlurField,
    actionClickEditTask,
    actionAddSubTask,
    actionRemoveSubTask,
  };
};

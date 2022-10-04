import { useState } from 'react';

import { useAppDispatch } from 'Redux/hooks';
import { showSnackbar } from 'Redux/Slices/snackbarSlice';

import { createTask, CreateTaskTaskPayload } from 'Clients/task/create';

import { TASK_TYPE_OPTIONS } from 'Shared/Constants/Task';
import dayjs from 'Shared/Helpers/datetime';
import { OptionValue } from 'Shared/Types/Option';

import { TaskFormField } from '../types';
import { TaskDifficultyEnum, TaskPriorityEnum } from './../../../../Shared/Types/Task';
import { TASK_FORM_ENTRIES } from './constants';

interface UseTaskFormFieldTaskFormProps {
  onCreateTask: () => void;
}

export const useCreateTaskForm = ({ onCreateTask }: UseTaskFormFieldTaskFormProps) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [taskEntries, setTaskEntries] = useState<TaskFormField>(TASK_FORM_ENTRIES);

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
    console.log('keys', keys);
    const invalidInputNames = keys.filter((key: string) => {
      const entry = taskEntries[key as keyof TaskFormField];

      return entry.required && !entry.value;
    });

    return {
      isValid: invalidInputNames.length === 0,
      invalidInputNames,
    };
  };

  const handleSubmitCreateTaskForm = async () => {
    setIsLoading(true);
    const payload: CreateTaskTaskPayload = {
      name: taskEntries.name.value.trim(),
      description: taskEntries.description.value.trim(),
      priority: taskEntries.priority.value,
      difficulty: taskEntries.difficulty.value,
      subTask: taskEntries.subTask.value,
      schedule: taskEntries.schedule.value,
      deadline: taskEntries.deadline.value,
      isHabit: taskEntries.isHabit.value,
    };

    await createTask(payload)
      .then(() => {
        dispatch(
          showSnackbar({
            text: 'Success create task!',
          }),
        );
        onCreateTask();
        handleSetEmptyForm();
      })
      .finally(() => setIsLoading(false));
  };

  const actionClickCreateTask = () => {
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

    handleSubmitCreateTaskForm();
  };

  const handleSetEmptyForm = () => {
    setTaskEntries({
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
    });
  };

  return {
    isLoading,
    taskEntries,
    handleSetEmptyForm,
    handleChangeTextInputField,
    handleChangeSelectField,
    handleChangeDateTimeField,
    handleChangeRadioField,
    handleOnBlurField,
    actionAddSubTask,
    actionRemoveSubTask,
    actionClickCreateTask,
  };
};

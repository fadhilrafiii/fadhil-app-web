import { useState } from 'react';

import { showSnackbar } from 'Redux/Slices/snackbarSlice';

import { createActivity, CreateTaskActivityPayload } from 'Clients/activity/create';

import { ACTIVITY_TYPE_OPTIONS } from 'Shared/Contants/Activity';
import { OptionValue } from 'Shared/Types/Option';

import { TaskFormField } from '../types';
import { useAppDispatch } from './../../../../Redux/hooks';
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
        value: value === ACTIVITY_TYPE_OPTIONS[0].value,
      },
    }));
  };

  const handleSubmitCreateTaskForm = async () => {
    setIsLoading(true);
    const payload: CreateTaskActivityPayload = {
      name: taskEntries.name.value,
      description: taskEntries.description.value,
      priority: taskEntries.priority.value,
      difficulty: taskEntries.difficulty.value,
      subTask: taskEntries.subTask.value,
      schedule: taskEntries.schedule.value,
      deadline: taskEntries.deadline.value,
      isHabit: taskEntries.isHabit.value,
    };

    await createActivity(payload)
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

  const handleSetEmptyForm = () => setTaskEntries(TASK_FORM_ENTRIES);

  return {
    isLoading,
    taskEntries,
    handleSetEmptyForm,
    handleChangeTextInputField,
    handleChangeSelectField,
    handleChangeDateTimeField,
    handleChangeRadioField,
    handleSubmitCreateTaskForm,
    actionAddSubTask,
    actionRemoveSubTask,
  };
};

import { useState } from 'react';

import { editActivity, EditActivityPayload } from 'Clients/activity/edit';

import { ACTIVITY_TYPE_OPTIONS } from 'Shared/Contants/Activity';
import { Activity } from 'Shared/Types/Activity';
import { OptionValue } from 'Shared/Types/Option';

import { TaskFormField } from '../types';

interface UseEditTaskFormProps {
  initialData: Activity;
  onEditTask: () => void;
}

export const useEditTaskForm = ({ initialData, onEditTask }: UseEditTaskFormProps) => {
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
    deadline: {
      value: initialData.deadline,
      errorMessage: '',
    },
    difficulty: {
      value: initialData.difficulty,
      errorMessage: '',
      required: true,
    },
    schedule: {
      value: initialData.schedule,
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
        value: value === ACTIVITY_TYPE_OPTIONS[0].value,
      },
    }));
  };

  const handleSubmitEditTaskForm = async () => {
    const payload: EditActivityPayload = {
      name: taskEntries.name.value,
      description: taskEntries.description.value,
      priority: taskEntries.priority.value,
      difficulty: taskEntries.difficulty.value,
      subTask: taskEntries.subTask.value,
      schedule: taskEntries.schedule.value,
      deadline: taskEntries.deadline.value,
      isHabit: taskEntries.isHabit.value,
    };

    await editActivity(initialData._id, payload).then(() => onEditTask());
  };

  return {
    taskEntries,
    handleChangeTextInputField,
    handleChangeSelectField,
    handleChangeDateTimeField,
    handleChangeRadioField,
    handleSubmitEditTaskForm,
    actionAddSubTask,
    actionRemoveSubTask,
  };
};

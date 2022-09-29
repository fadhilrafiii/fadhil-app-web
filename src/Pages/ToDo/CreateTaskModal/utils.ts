import { useState } from 'react';

import { Activity } from 'Shared/Types/Activity';

import { OptionValue } from './../../../Components/Select/types';
import { CreateTaskFormField } from './types';

export const useCreateTaskForm = (initialValue?: Activity) => {
  const [taskEntry, setTaskEntry] = useState<CreateTaskFormField>({
    name: {
      value: initialValue?.name || '',
      errorMessage: '',
      required: true,
    },
    description: {
      value: initialValue?.description || '',
      errorMessage: '',
      required: true,
    },
    priority: {
      value: initialValue?.priority,
      errorMessage: '',
      required: true,
    },
    deadline: {
      value: initialValue?.deadline,
      errorMessage: '',
    },
    difficulty: {
      value: initialValue?.difficulty,
      errorMessage: '',
      required: true,
    },
    schedule: {
      value: initialValue?.deadline,
      errorMessage: '',
    },
    prerequisites: {
      value: initialValue?.prerequisites || [],
      errorMessage: '',
    },
    inputSubTask: {
      value: '',
      errorMessage: '',
    },
    subTask: {
      value: initialValue?.subTask || [],
      errorMessage: '',
    },
    isHabit: {
      value: initialValue?.isHabit || false,
      errorMessage: '',
    },
  });

  const handleChangeTextInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTaskEntry((prev: CreateTaskFormField) => ({
      ...prev,
      [name]: { ...prev[name as keyof CreateTaskFormField], value },
    }));
  };

  const actionSelectOptionsField = (name: string, value: OptionValue) => {
    setTaskEntry((prev: CreateTaskFormField) => ({
      ...prev,
      [name]: { ...prev[name as keyof CreateTaskFormField], value },
    }));
  };

  const actionAddSubtask = () => {
    if (!taskEntry.inputSubTask) return;

    setTaskEntry((prev: CreateTaskFormField) => ({
      ...prev,
      subTask: {
        ...prev.subTask,
        value: [...prev.subTask.value, prev.inputSubTask.value],
      },
      inputSubTask: {
        ...prev.inputSubTask,
        value: '',
      },
    }));
  };

  const actionRemoveSubtask = (taskIndex: number) => {
    setTaskEntry((prev: CreateTaskFormField) => ({
      ...prev,
      subTask: {
        ...prev.subTask,
        value: prev.subTask.value.filter((val: string, index: number) => index !== taskIndex),
      },
    }));
  };

  return {
    taskEntry,
    handleChangeTextInputField,
    actionSelectOptionsField,
    actionAddSubtask,
    actionRemoveSubtask,
  };
};

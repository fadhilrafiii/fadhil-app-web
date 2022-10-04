import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

import { TaskDifficultyEnum, TaskPriorityEnum } from 'Shared/Types/Task';

export interface EditTaskPayload {
  name: string;
  description: string;
  deadline?: Date;
  schedule: Date;
  // prerequisites: []; TODO: Add prerequisites
  subTask?: string[];
  isHabit?: boolean;
  difficulty: TaskDifficultyEnum;
  priority: TaskPriorityEnum;
}

export const editTask = async (taskId: string, payload: EditTaskPayload) => {
  try {
    const res = await axios.put(`/activities/${taskId}`, payload);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

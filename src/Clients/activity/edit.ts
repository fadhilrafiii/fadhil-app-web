import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

import { ActivityDifficultyEnum, ActivityPriorityEnum } from 'Shared/Types/Activity';

export interface EditActivityPayload {
  name?: string;
  description?: string;
  deadline?: Date;
  schedule?: Date;
  // prerequisites: []; TODO: Add prerequisites
  subTask?: string[];
  isHabit?: boolean;
  difficulty?: ActivityDifficultyEnum;
  priority?: ActivityPriorityEnum;
}

export const editActivity = async (taskId: string, payload: EditActivityPayload) => {
  try {
    const res = await axios.put(`/activities/${taskId}`, payload);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

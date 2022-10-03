import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

import { ActivityDifficultyEnum, ActivityPriorityEnum } from 'Shared/Types/Activity';

export interface CreateTaskActivityPayload {
  name: string;
  description: string;
  deadline?: Date;
  schedule?: Date;
  // prerequisites: []; TODO: Add prerequisites
  subTask: string[];
  isHabit?: boolean;
  difficulty?: ActivityDifficultyEnum;
  priority?: ActivityPriorityEnum;
}

export const createActivity = async (payload: CreateTaskActivityPayload) => {
  try {
    const res = await axios.post('/activities', payload);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

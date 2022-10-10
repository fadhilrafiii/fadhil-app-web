import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

import { TaskSectionEnum } from 'Shared/Types/Task';

interface GetTasksFilter extends Record<string, string> {
  type: TaskSectionEnum;
}

export const getTasksByType = async (filter?: GetTasksFilter) => {
  try {
    const query = new URLSearchParams(filter).toString();

    const res = await axios.get(`/activities/by-type?${query}`);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

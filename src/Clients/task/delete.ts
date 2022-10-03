import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

export const deleteTask = async (taskId: string) => {
  try {
    const res = await axios.delete(`/activities/${taskId}`);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

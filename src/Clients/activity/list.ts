import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

export const getListActivities = async () => {
  try {
    const res = await axios.get('/activities');

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

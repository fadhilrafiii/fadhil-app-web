import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

export const logoutAPI = async (): Promise<AxiosResponse> => {
  try {
    const res = await axios.post('/auth/logout', undefined);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

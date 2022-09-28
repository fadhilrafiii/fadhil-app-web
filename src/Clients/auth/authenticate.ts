import { AxiosError, AxiosResponse } from 'axios';

import axios from '../axios';

export const authenticateAPI = async (): Promise<AxiosResponse> => {
  try {
    const res = await axios.post('/auth/authenticate');

    return res;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

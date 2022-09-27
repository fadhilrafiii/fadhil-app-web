import { AxiosError, AxiosResponse } from 'axios';

import axios from '../axios';

export const authenticateAPI = async () => {
  try {
    const res = await axios.post('/auth/authenticate', undefined);

    return res;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

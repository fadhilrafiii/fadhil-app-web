import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import axios from '../axios';

export const authenticateAPI = async () => {
  try {
    const res = await axios.post('/auth/authenticate', undefined, {
      headers: {
        'X-Fadhil-Token': Cookies.get('token') || '',
      },
    });

    return res;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

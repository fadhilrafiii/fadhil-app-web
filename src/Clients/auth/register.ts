import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

export interface RegisterData {
  username: string;
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
  avatar?: string;
}

export const registerAPI = async (data: RegisterData): Promise<AxiosResponse> => {
  try {
    const res = await axios.post('/auth/register', data);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

export interface LoginData {
  username: string;
  password: string;
}

export const loginAPI = async (data: LoginData): Promise<AxiosResponse> => {
  try {
    const res = await axios.post('/auth/login', data);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

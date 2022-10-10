import { AxiosError, AxiosResponse } from 'axios';

import axios from 'Clients/axios';

interface GetTaskParams {
  month?: number;
  year?: number;
}

export const getTasks = async ({ month, year }: GetTaskParams) => {
  try {
    const querystring = new URLSearchParams();
    if (month && month >= 0) querystring.set('month', month.toString());
    if (year) querystring.set('year', year.toString());

    const res = await axios.get(`/activities?${querystring}`);

    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response as AxiosResponse;
  }
};

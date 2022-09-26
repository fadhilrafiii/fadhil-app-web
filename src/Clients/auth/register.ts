import axios from 'Clients/axios';

export interface RegisterData {
  username: string;
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
  avatar?: string;
}

export const registerAPI = async (data: RegisterData) => {
  const res = await axios.post('/auth/login', data);

  return res;
};

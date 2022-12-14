import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

export default axios;

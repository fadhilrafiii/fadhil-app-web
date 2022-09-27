import baseAxios from 'axios';
import Cookies from 'js-cookie';

const axios = baseAxios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 2000,
  headers: {
    'X-Fadhil-Token': Cookies.get('token') || '',
  },
});

export default axios;

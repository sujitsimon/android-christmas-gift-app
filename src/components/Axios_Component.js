import axios from 'axios';

const baseURL = 'http://172.20.10.8:45678/'

const Axios = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: { 
        'Content-Type': 'application/json', 
        'Access-Control-Request-Headers': '*'
      },
  });

export default Axios;
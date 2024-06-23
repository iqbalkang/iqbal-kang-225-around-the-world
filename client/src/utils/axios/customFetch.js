import axios from 'axios';

const customFetch = axios.create({
  // baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
  // baseURL: `http://54.215.113.53/api/v1`,
  baseURL: `http://127.0.0.1:8000/api/v1`,
});

export default customFetch;

import axios from 'axios';

const customFetch = axios.create({
  baseURL: `http://54.67.94.10/api/v1`,
});

export default customFetch;

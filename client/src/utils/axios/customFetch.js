import axios from 'axios';

const customFetch = axios.create({
<<<<<<< HEAD
  baseURL: `http://127.0.0.1:8000/api/v1`,
  // baseURL: `http://54.67.94.10/api/v1`,
=======

  // baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
  baseURL: `http://54.215.113.53/api/v1`,

>>>>>>> origin/main
});

export default customFetch;

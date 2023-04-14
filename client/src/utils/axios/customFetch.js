import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? 'api/v1' : 'http://127.0.0.1:8000/api/v1'

const customFetch = axios.create({
  baseURL,
})

export default customFetch

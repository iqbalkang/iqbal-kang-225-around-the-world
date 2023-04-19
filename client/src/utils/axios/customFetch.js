import axios from 'axios'

const customFetch = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
})

export default customFetch

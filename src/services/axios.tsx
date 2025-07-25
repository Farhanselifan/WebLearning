import axios from 'axios';

const axiosExample = axios.create({
  baseURL: 'http://localhost:400',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosExample
import axios from 'axios'

const BASE_URL = 'http://192.168.1.92:3000'

export const api = axios.create({
  baseURL: BASE_URL,
})
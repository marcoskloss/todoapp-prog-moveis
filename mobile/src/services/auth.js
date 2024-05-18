import { api } from './api'

async function authUser(username, password) {
  const response = await api.post('/login', { username, password })
  return response.data
}

async function createUser(username, password) {
}

export default {
    authUser,
    createUser
}
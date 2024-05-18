import { api } from './api'

async function create(name, userId) {
    const response = await api.post(`/tags/${userId}/create`, { name })
    return response.data
}

async function findAll(userId) {
    const response = await api.get(`/tags/${userId}/find`)
    return response.data
}

export default {
    create,
    findAll,
}
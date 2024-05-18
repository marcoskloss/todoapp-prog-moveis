import { api } from "./api"

async function create(description, tagId, userId) {
  const response = await api.post(`/tasks/${userId}/create`, {
    tagId,
    description,
  })
  return response.data
}

async function completeTask(taskId, userId) {
  await api.post(`/tasks/${userId}/complete/${taskId}`)
}

async function updateTask(taskId, userId, description, completed) {
  await api.post(`/tasks/${userId}/update/${taskId}`, {
    description,
    completed,
  })
}

async function deleteTask(taskId, userId) {
  await api.delete(`/tasks/${userId}/${taskId}`)
}

async function findAll(userId) {
  const response = await api.get(`/tasks/${userId}/find`)
  return response.data
}

async function findOne(taskId, userId){
  const response = await api.get(`/tasks/${userId}/find/${taskId}`)
  return response.data
}


export default {
  create,
  completeTask,
  findAll,
  findOne,
  updateTask,
  deleteTask,
}
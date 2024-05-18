import service from "../services/task.js"

async function create(params, body) {
    const { userId } = params
    const { description, tagId } = body

    if (!userId)
        throw new Error("User are required")

    if (!description)
        throw new Error("Description are required")

    let tag = tagId;

    let result = await service.create(description, tagId, userId);
    return result
}

async function completeTask(params) {
    const { userId, taskId } = params

    if (!userId)
        throw new Error("User are required")

    if (!taskId)
        throw new Error("Task are required")

    return service.completeTask(taskId, userId);
}

async function findAll(params) {
    const { userId } = params

    if (!userId)
        throw new Error("User are required")

    return service.findAll(userId);
}

async function findOne(params) {
    const { userId, taskId } = params

    if (!userId)
        throw new Error("User are required")

    if (!taskId)
        throw new Error("Task are required")

    return service.findOne(taskId, userId);
}

async function updateTask(params, body) {
    const { userId, taskId } = params
    const { description, completed } = body

    if (!userId)
        throw new Error("User are required")

    if (completed === undefined || completed === null)
        throw new Error("Completed are required")
    
    if (!description)
        throw new Error("Description are required")

    return service.updateTask(taskId, userId, description, completed);
}

async function deleteTask(params) {
    const { userId, taskId } = params

    if (!userId)
        throw new Error("User are required")

    if (!taskId)
        throw new Error("Task are required")

    return service.deleteTask(taskId, userId);
}

export default {
    create,
    completeTask,
    findAll,
    findOne,
    updateTask,
    deleteTask
}
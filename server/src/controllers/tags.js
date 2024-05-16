import service from "../services/tag.js"

async function create(params, body) {
    const { userId } = params
    const { name } = body

    if (!userId)
        throw new Error("User are required")

    if (!name)
        throw new Error("Name are required")

    return service.create(name, userId);
}

async function findAll(params) {
    const { userId } = params

    if (!userId)
        throw new Error("User are required")

    return service.findAll(userId);
}

async function findOne(params) {
    const { userId, tagId } = params

    if (!userId)
        throw new Error("User are required")

    if (!tagId)
        throw new Error("Tag are required")

    return service.findOne(tagId, userId);
}

export default {
    create,
    findAll,
    findOne
}
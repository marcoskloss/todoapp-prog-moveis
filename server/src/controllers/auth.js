import service from "../services/auth.js"

async function authUser(body) {
    const { username, password } = body;

    if (!username || !password)
        throw new Error("Username and password are required")

    return service.authUser(username, password)
}

export default {
    authUser
}
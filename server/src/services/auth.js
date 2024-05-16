import sqlite from "../database/sqlite.js"

async function authUser(username, password) {

    const db = await sqlite.getInstance();

    const user = await db.get("SELECT id, password FROM user where username = ?", username)
    
    if (!user || user.PASSWORD !== password)
        throw new Error("Incorrect username or password")
    else
        return {
            data: {ID: user.ID}
        }
}

export default {
    authUser
}
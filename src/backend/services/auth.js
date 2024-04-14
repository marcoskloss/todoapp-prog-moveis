import sqlite from "../database/sqlite.js"

async function authUser(username, password) {

    const db = await sqlite.getInstance();

    const result = await db.sql("SELECT id, password FROM user where username = ?", [username])
    const user = result?.[0] || null

    
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
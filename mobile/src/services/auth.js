import sqlite from "../backend/database/sqlite.js"

async function getNextd() {
    const db = await sqlite.getInstance();
    const [result] = await db.sql('SELECT IFNULL(MAX(id), 0) + 1 as nextId FROM user')
    return result.nextId
}

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

async function createUser(username, password) {
    const db = await sqlite.getInstance();
    const userId = await getNextd();
    const sql = `INSERT INTO USER VALUES (${userId}, ?, ?);`;
    await db.sql(sql, [username, password]);

    return {
        message: 'User created',
        data: {
            ID: userId,
            USERNAME: username,
        }
    }
}

export default {
    authUser,
    createUser
}
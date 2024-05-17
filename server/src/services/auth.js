import sqlite from "../database/sqlite.js"

const db = await sqlite.getInstance();


async function getNextd() {
    const { nextId } = await db.get("SELECT IFNULL(MAX(id), 0) + 1 as nextId FROM USER");

    return nextId
}

async function authUser(username, password) {
    const user = await db.get("SELECT id, password FROM user where username = ?", username)
    
    if (!user || user.PASSWORD !== password)
        throw new Error("Incorrect username or password")
    else
        return {
            data: {ID: user.ID}
        }
}

async function createUser(username, password) {
    const newId = await getNextd();

    db.exec(`INSERT INTO "USER" (ID, USERNAME, PASSWORD) VALUES(${newId}, '${username}', '${password}');`);

    return {
        data: {
            ID: newId,
            USERNAME: username
        }
    }
}

export default {
    authUser,
    createUser
}
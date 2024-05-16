import sqlite from "../database/sqlite.js"


async function getNextd() {
    const db = await sqlite.getInstance();
    const [result] = await db.sql('SELECT IFNULL(MAX(id), 0) + 1 as nextId FROM TAG')
    return result.nextId
}

async function create(name, userId) {
    const db = await sqlite.getInstance();

    const nextId = await getNextd();

    const sql = `INSERT INTO TAG (ID, NAME, USER_ID) VALUES(${nextId}, ?, ?)`

    const result = await db.sql(sql, [name, userId])

    return {
        message: "Created tag",
        data: {
            ID: nextId,
            NAME: name,
        }
    }
}

async function findAll(userId) {
    const db = await sqlite.getInstance();

    const result = await db.sql(`SELECT * FROM TAG WHERE USER_ID = ?;`, [userId]);

    return {
        data: result ?? []
    }

}

async function findOne(tagId, userId){
    const db = await sqlite.getInstance();
    
    const result = await db.sql(`SELECT ID, NAME FROM TAG WHERE ID = ? AND USER_ID = ?`, [tagId, userId]);
    const tag = result?.[0] || null

    return {
        data: tag
    }
}


export default {
    create,
    findAll,
    findOne,
}
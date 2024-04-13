import sqlite from "../database/sqlite.js"

const db = await sqlite.getInstance();


async function getNextd() {
    const { nextId } = await db.get("SELECT IFNULL(MAX(id), 0) + 1 as nextId FROM TAG");

    return nextId
}

async function create(name, userId) {
    const nextId = await getNextd();

    const sql = `INSERT INTO TAG (ID, NAME, USER_ID) VALUES(${nextId}, '${name}', ${userId})`

    await db.exec(sql)

    return {
        message: "Created tag",
        data: {
            ID: nextId,
            NAME: name,
        }
    }
}

async function findAll(userId) {
    const result = await db.all(`SELECT ID, NAME FROM TAG WHERE USER_ID = ${userId}`);

    return {
        data: result ?? []
    }

}

async function findOne(tagId, userId){
    const result = await db.get(`SELECT ID, NAME FROM TAG WHERE ID = ${tagId} AND USER_ID = ${userId}`);

    return {
        data: result ?? null
    }
}


export default {
    create,
    findAll,
    findOne
}
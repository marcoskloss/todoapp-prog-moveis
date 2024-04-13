import sqlite from "../database/sqlite.js"

const db = await sqlite.getInstance();


async function getNextd() {
    const { nextId } = await db.get("SELECT IFNULL(MAX(id), 0) + 1 as nextId FROM TASK");

    return nextId
}

async function create(description, tagId, userId) {
    const nextId = await getNextd();

    const sql = `INSERT INTO TASK (ID, DESCRIPTION, TAG_ID, USER_ID) VALUES(${nextId}, '${description}', ${tagId ?? "NULL"} , ${userId})`

    await db.exec(sql)

    return {
        message: "Created task",
        data: {
            ID: nextId,
            DESCRIPTION: description,
            COMPLETED: false,
            TAG: tagId
        }
    }
}

async function completeTask(taskId, userId) {
    let task = await  findOne(taskId, userId)

    if (!task.data)
        throw new Error("Task not found")

    const sql = `UPDATE TASK SET COMPLETED='S' WHERE ID = ${taskId} AND USER_ID = ${userId}`

    await db.exec(sql)

    task.data.COMPLETED = true

    return {
        message: "Completed task",
        data: task.data
    }
}

async function findAll(userId) {
    const result = await db.all(`SELECT  ID, DESCRIPTION, COMPLETED, TAG_ID, (SELECT NAME FROM TAG WHERE ID = TASK.TAG_ID) AS TAG_NAME FROM TASK WHERE USER_ID = ${userId}`);

    return {
        data: result.map(x => {
            return {
                ID: x.ID,
                DESCRIPTION: x.DESCRIPTION,
                COMPLETED: x.COMPLETED == "S",
                TAG: x.TAG_ID 
                ? {
                    ID: x.TAG_ID,
                    NAME: x.TAG_NAME
                } : null
            }
        }) ?? []
    }

}

async function findOne(taskId, userId){
    const result = await db.get(`SELECT  ID, DESCRIPTION, COMPLETED, TAG_ID, (SELECT NAME FROM TAG WHERE ID = TASK.TAG_ID) AS TAG_NAME FROM TASK WHERE ID = ${taskId} AND USER_ID = ${userId}`);

    return {
        data: {
            ID: result.ID,
            DESCRIPTION: result.DESCRIPTION,
            COMPLETED: result.COMPLETED == "S",
            TAG: result.TAG_ID 
            ? {
                ID: result.TAG_ID,
                NAME: result.TAG_NAME
            } : null
        } ?? null
    }
}


export default {
    create,
    completeTask,
    findAll,
    findOne
}
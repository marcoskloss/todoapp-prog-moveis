import sqlite from "../database/sqlite.js"


async function getNextd() {
    const db = await sqlite.getInstance();
    const [result] = await db.sql('SELECT IFNULL(MAX(id), 0) + 1 as nextId FROM TASK')
    return result.nextId
}

async function create(description, tagId, userId) {
    const db = await sqlite.getInstance();

    const nextId = await getNextd();

    const sql = `INSERT INTO TASK (ID, DESCRIPTION, TAG_ID, USER_ID) VALUES(${nextId}, '${description}', ${tagId ?? "NULL"} , ${userId})`

    await db.sql(sql)

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
    const db = await sqlite.getInstance();

    let task = await  findOne(taskId, userId)

    if (!task.data)
        throw new Error("Task not found")

    const sql = `UPDATE TASK SET COMPLETED='S' WHERE ID = ${taskId} AND USER_ID = ${userId}`

    await db.sql(sql)

    task.data.COMPLETED = true

    return {
        message: "Completed task",
        data: task.data
    }
}

async function updateTask(taskId, userId, description, completed) {
    const db = await sqlite.getInstance();

    let task = await findOne(taskId, userId)

    if (!task.data)
        throw new Error("Task not found")

    completed = completed ? 'S' : 'N'
        
    const sql = `UPDATE TASK SET COMPLETED=?, DESCRIPTION=? WHERE ID = ? AND USER_ID = ?`
    await db.sql(sql, [completed, description, taskId, userId])

    task.data.COMPLETED = completed === 'S'
    task.data.DESCRIPTION = description

    return {
        message: "Task updated",
        data: task.data
    }
}

async function deleteTask(taskId, userId) {
    const db = await sqlite.getInstance();

    const sql = `DELETE FROM TASK WHERE ID = ? AND USER_ID = ?`;
    console.log({sql})
    await db.sql(sql, [taskId, userId])

    return {
        message: "Task deleted",
        data: null
    }
}

async function findAll(userId) {
    const db = await sqlite.getInstance();

    const result = await db.sql(`SELECT  ID, DESCRIPTION, COMPLETED, TAG_ID, (SELECT NAME FROM TAG WHERE ID = TASK.TAG_ID) AS TAG_NAME FROM TASK WHERE USER_ID = ${userId}`);

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
    const db = await sqlite.getInstance();

    const result = await db.sql(`SELECT  ID, DESCRIPTION, COMPLETED, TAG_ID, (SELECT NAME FROM TAG WHERE ID = TASK.TAG_ID) AS TAG_NAME FROM TASK WHERE ID = ${taskId} AND USER_ID = ${userId}`);
    const task = result?.[0] || null

    if (!task) return { data: null }

    return {
        data: {
            ID: task.ID,
            DESCRIPTION: task.DESCRIPTION,
            COMPLETED: task.COMPLETED == "S",
            TAG: task.TAG_ID 
            ? {
                ID: task.TAG_ID,
                NAME: task.TAG_NAME
            } : null
        } ?? null
    }
}


export default {
    create,
    completeTask,
    findAll,
    findOne,
    updateTask,
    deleteTask,
}
import express from "express"
import controller from "../controllers/tasks.js"

const tasksRouter = express.Router();


tasksRouter.post("/:userId/create", async (req, res) => {
    const result = await controller.create(req.params, req.body);

    return res.json(result);
})

tasksRouter.post("/:userId/complete/:taskId", async (req, res) => {
    const result = await controller.completeTask(req.params);

    return res.json(result);
})

tasksRouter.get("/:userId/find", async (req, res) => {
    const result = await controller.findAll(req.params);

    return res.json(result);
})
tasksRouter.get("/:userId/find/:taskId", async (req, res) => {
    const result = await controller.findOne(req.params);

    return res.json(result);
})
tasksRouter.post("/:userId/update/:taskId", async (req, res) => {
    const result = await controller.updateTask(req.params, req.body);

    return res.json(result);
})
tasksRouter.delete("/:userId/:taskId", async (req, res) => {
    const result = await controller.deleteTask(req.params);

    return res.json(result);
})


export default tasksRouter
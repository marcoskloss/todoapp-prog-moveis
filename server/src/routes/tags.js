import express from "express"
import controller from "../controllers/tags.js"

const tagsRouter = express.Router();


tagsRouter.post("/:userId/create", async (req, res) => {
    const result = await controller.create(req.params, req.body);

    return res.json(result);
})

tagsRouter.get("/:userId/find", async (req, res) => {
    const result = await controller.findAll(req.params);

    return res.json(result);
})

tagsRouter.get("/:userId/find/:tagId", async (req, res) => {
    const result = await controller.findOne(req.params);

    return res.json(result);
})

export default tagsRouter
import express from "express"
import tasksRouter from "./tasks.js";
import tagsRouter from "./tags.js";
import authController from "../controllers/auth.js"

const router = express.Router();


router.post('/login', async (req, res) => {
    const result = await authController.authUser(req.body);

    return res.json(result);
})

router.post('/signin', async (req, res) => {
    const result = await authController.createUser(req.body);

    return res.json(result);
})


router.use("/tasks", tasksRouter)

router.use("/tags", tagsRouter)


router.use((req, res) => {
    return res.status(404).json({ message: `Route ${req.url} not found` })
})

router.use((err, req, res, next) => {
    console.log(err)
    return res.status(400).json({
        message: err.message
    })
})

export default router;
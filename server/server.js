import "express-async-errors"
import express from "express";
import router from "./src/routes/router.js"
import cors from "cors"
import morgan from "morgan";

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use('', router)


app.listen(3000, () => {
    console.log(`Server listening on port 3000`)
})
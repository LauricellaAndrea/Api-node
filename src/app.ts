import express from "express"
import cors from "cors"
import {validationErrorMiddleware} from "./lib/validation"
import planetsRouters from "./routes/planet"

const corsOption = {
    origin: "http://localhost:8080"
}

const app = express()

app.use(express.json())
app.use(cors(corsOption))
app.use(validationErrorMiddleware)
app.use("/planets", planetsRouters)


app.listen(3000, ()=> console.log("running on port",3000 ))
import express from "express"
import cors from "cors"
import {validationErrorMiddleware} from "./lib/validation"
import planetsRouters from "./routes/planet"
import { initSessionMiddleware } from "./lib/middleware/session"
import {passport} from "./lib/middleware/passport"

const corsOption = {
    origin: "http://localhost:8080"
}

const app = express()

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(cors(corsOption))
app.use(validationErrorMiddleware)
app.use("/planets", planetsRouters)


app.listen(3000, ()=> console.log("running on port",3000 ))
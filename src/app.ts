import express from "express"
import {PrismaClient} from "@prisma/client"

import { 
    validate,
    validationErrorMiddleware,
    planetSchema,
    PlanetData
} from "./lib/validation"

const app = express()
const prisma = new PrismaClient()
app.use(express.json())

//get

app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany()
    response.json(planets)
})
app.post("/planets", validate({body: planetSchema}),  async (request, response) => {
    const planetData: PlanetData = request.body;

    const planet = await prisma.planet.create({
        data: planetData
    })

    response.json(planet)
})

app.use(validationErrorMiddleware)

app.listen(3000, ()=> console.log("running on port",3000 ))
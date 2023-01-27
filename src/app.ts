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

//Get Unique ID

app.get("/planets/:id", async (request, response) => {
    const planetId = Number(request.params.id)

    const planet = await prisma.planet.findUnique({
        where: { id: planetId } 
    });

    response.json(planet)
})

//Post method
app.post("/planets", validate({body: planetSchema}),  async (request, response) => {
    const planetData: PlanetData = request.body;

    const planet = await prisma.planet.create({
        data: planetData
    })

    response.json(planet)
})

app.use(validationErrorMiddleware)

app.listen(3000, ()=> console.log("running on port",3000 ))
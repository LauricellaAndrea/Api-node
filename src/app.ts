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

// GET MANY 

app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany()
    response.json(planets)
})

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

// Put method

app.put("/planets/:id", async (request, response)=>{
    const {id} = request.params
    const { name, diameter, moons} = request.body
    const planet = await prisma.planet.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            diameter,
            moons
        }
    })
    response.json(planet)
})

// Delete method

app.delete("/planets/:id", async (request, response) => {
    const {id} = request.params
    const planet = await prisma.planet.delete({
        where: {
            id: Number(id)
        }
    })
    response.json(planet)
})

app.listen(3000, ()=> console.log("running on port",3000 ))
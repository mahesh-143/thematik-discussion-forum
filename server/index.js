import fastify from "fastify"
import sensible from "@fastify/sensible"
import cors from "@fastify/cors"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

dotenv.config()

const app = fastify()
const prisma = new PrismaClient()

app.register(sensible)
app.register(cors)

app.get("/", async (request, reply) => {
  return { hello: "world" }
})

app.listen({ port: process.env.PORT }, console.log("server is live "))

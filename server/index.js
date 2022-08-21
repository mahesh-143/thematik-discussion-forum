import fastify from "fastify"
import sensible from "@fastify/sensible"
import cors from "@fastify/cors"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"
import bcrypt from "fastify-bcrypt"

dotenv.config()

const app = fastify()
const prisma = new PrismaClient()

app.register(sensible)
app.register(cors)
app.register((bcrypt),
  {
    saltWorkFactor: 12,
  })

// user routes

// sign up 

app.post("/signup", async (req, res) => {
  try {
    // if user already exist
    const userExists = await prisma.user.findUnique({
      where: { email: req.body.email },
    })
    if (userExists) {
      return res.createError(409, "Email already exists")
    }
     
    // create new user
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: app.bcrypt.hash(req.body.password),
      },
    })

    return res
      .status(200)
      .send({
        error: false,
        message: "Please verify your email",
        data: { userId: user.id, email: user.email },
      })
  } catch  (error){
     throw error 
  }
})

app.listen({ port: process.env.PORT }, console.log("server is live "))

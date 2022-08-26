// imports

import express from "express"
import cors from "cors"
import env from "dotenv"
import routes from "./src/api/routes.js"
env.config()

const app = express()

//bodyparser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cors
app.use(cors())

//routes

app.use('/api', routes)

app.use((err, req, res, next) => {
    let {message="Something went wrong", status=500, error=true} = err
    return res.status(status).json({error, message})
})

//server 
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})

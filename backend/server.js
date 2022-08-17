const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const playerRoutes = require("./routes/players")

const app = express()

//Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//Routes
app.use("/api/players", playerRoutes)


//Connect to DB
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & Listening on port 4000")
        })
    })
    .catch((error) => {
        console.log(error)
    })

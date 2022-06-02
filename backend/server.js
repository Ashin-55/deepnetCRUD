const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const userRouter = require("./routes/userRouter")
const connectDB = require("./config/database")

const port = process.env.PORT || 5000


connectDB()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("api is running")
})
app.use("/api",userRouter)

app.listen(port,()=>{
    console.log("server is running",port)
})

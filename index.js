import express from "express"
import {} from 'dotenv/config'
import { databaseRSOnline } from "./config/Database.js"
import router from "./routes/index.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

try {
    await databaseRSOnline.authenticate()
    console.log('database connected...')
} catch (error) {
    console.log(error)
}

app.use(cors( {credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(5001, () => {
    console.log("server running at port 5001")
})

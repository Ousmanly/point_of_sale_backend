import bodyParser from "body-parser"
import { config } from "dotenv"
import express from "express"
import userRoute from "./routes/userRoute.js"
import authrouter from "./routes/authRoute.js"

const app = express()

config()
app.use(bodyParser.json());
app.use('/api', userRoute)
app.use('/api', authrouter )
app.get('/', (_req, res) => {
  res.send('hello world')
})
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`The server is running in port ${port}`);
    
})
import bodyParser from "body-parser"
import { config } from "dotenv"
import express from "express"
import userRoute from "./routes/userRoute.js"
import authrouter from "./routes/authRoute.js"
import productRoute from "./routes/productRoute.js"
import supplierRoute from "./routes/supplierRoute.js"
import receptionRoute from "./routes/receptionRoute.js"
import saleRoute from "./routes/saleRoute.js"
import inventoryRoute from "./routes/inventoryRoute.js"

const app = express()

config()
app.use(bodyParser.json());
app.use('/api', userRoute)
app.use('/api', authrouter )
app.use('/api', productRoute )
app.use('/api', supplierRoute )
app.use('/api', receptionRoute )
app.use('/api', saleRoute )
app.use('/api', inventoryRoute )
app.get('/', (_req, res) => {
  res.send('hello world')
})
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`The server is running in port ${port}`);
    
})
import cors from "cors"
import express from "express"
import { httpMiddleware } from "../Middleware/HttpMiddleware"
import { router } from "../Router"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(httpMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server ativo: http://localhost:${PORT}`)
})
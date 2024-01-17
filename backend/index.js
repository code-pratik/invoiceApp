import dotenv from "dotenv"
import express from "express"
import {connectDb} from "./db.js"
import cors from  "cors"
import cookieParser from "cookie-parser"
import { routes } from "./routes/index.js"




const server = express()
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

dotenv.config()
server.use(cors())
server.use(cookieParser());


connectDb()

server.use("/api",routes)


server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
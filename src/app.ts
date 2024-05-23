import express,{ Application } from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import dotenv from "dotenv";

//----------------

dotenv.config();

const app: Application = express();



app.use(express.json()); //Middleware
app.use(cors(corsOptions));

export default app;
import express, { Application } from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import dotenv from "dotenv";
import baseRoute from "./routes/base.routes";           
import apiRoutes from './routes/api.routes';

dotenv.config();

const app: Application = express();

app.use(express.json()); // Middleware
app.use(cors(corsOptions));

app.use("/", baseRoute);
app.use("/api", apiRoutes);

export default app;

import express from "express";
import { carController } from "../controllers/carController";

const router = express.Router();

// Ruta para obtener todos los coches
router.get("/", carController.getAllCars);

export default router;

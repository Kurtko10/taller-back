import express from "express";
import { carController } from "../controllers/carController";
import { auth } from "../middlewares/auth";


const router = express.Router();

// Ruta para obtener todos los coches
//router.get("/", carController.getAllCars);

// Ver coches de un usuario
//router.get("/users", auth, carController.getUserCar);

router.get('/',carController.getAllCars);
router.get('/cars', auth, carController.getUserCar);

export default router;

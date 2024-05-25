import express from "express";
import { carController } from "../controllers/carController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";


const router = express.Router();

// Obtener todos los vehículos
router.get('/',auth,authorize(["manager"]),carController.getAllCars);

// Obtener vehículos de un usuario
router.get('/cars', auth, carController.getUserCar);

// Añadir vehículo a un usuario
router.post('/cars/userCars', auth, carController.addUserCar);

// Eliminar vehículo de un usuario
router.delete('/cars/userCars/:carId', auth, carController.deleteUserCar);

export default router;

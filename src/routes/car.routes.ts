import express from "express";
import { carController } from "../controllers/carController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";


const router = express.Router();

// Obtener todos los vehículos
router.get('/',auth,authorize(["manager"]),carController.getAllCars);

// Obtener vehículos de un usuario
router.get('/userCars', auth, carController.getUserCar);
// Vehiculo de un usuario según su ID
router.get('/userCars/:userId', carController.getCarsByUserId);

// Añadir vehículo a un usuario
router.post('/userCars', auth, carController.addUserCar);

// Añadir vehículo a un usuario específico
router.post('/:userId', auth, carController.addUserCarToSpecificUser);

// Eliminar vehículo de un usuario
router.delete('/userCars/:carId', auth, carController.deleteUserCar);


export default router;

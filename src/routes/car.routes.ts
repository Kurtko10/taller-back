import express from "express";
import { carController } from "../controllers/carController";
import { auth } from "../middlewares/auth";


const router = express.Router();


router.get('/',carController.getAllCars);
router.get('/cars', auth, carController.getUserCar);
router.post('/cars/userCars', auth, carController.addUserCar);
router.delete('/cars/userCars/:carId', auth, carController.deleteUserCar);

export default router;

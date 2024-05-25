import express from "express";
import { appointmentController } from "../controllers/appointmentController";
import { auth } from "../middlewares/auth";
//import { authorize } from "../middlewares/authorize";

const router = express.Router();

// Citas totales ADMIN
router.get('/', appointmentController.getAllAppointments);




export default router;

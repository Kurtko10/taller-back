import express from "express";
import { appointmentController } from "../controllers/appointmentController";
import { auth } from "../middlewares/auth";
//import { authorize } from "../middlewares/authorize";

const router = express.Router();

// Citas totales ADMIN
router.get('/', appointmentController.getAllAppointments);
// Citas de un trabajador
router.get('/worker', auth, appointmentController.getAppointmentsByWorkerId);

// Citas de un cliente
router.get('/client/:clientId?', auth, appointmentController.getAppointmentsByClientId);



export default router;

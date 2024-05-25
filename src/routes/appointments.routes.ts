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

// Obtener cita por Id de cita
router.get('/:id', auth, appointmentController.getAppointmentById);

// Crear nueva cita
router.post('/', auth, appointmentController.createAppointment);

// Ruta para actualizar una cita específica
router.put('/:id',auth, appointmentController.updateAppointment);

// Eliminar una cita
router.delete('/:id', auth, appointmentController.deleteAppointment);


export default router;

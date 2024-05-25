import express from "express";
import userRoutes from './users.routes';
import authRoutes from "./auth.routes";
import carRoutes from "./car.routes";
import appointmentsRoutes from "./appointments.routes"

const router = express.Router();



// API routes
router.use('/users', userRoutes);

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de coches
router.use('/cars', carRoutes);

router.use('/appointments', appointmentsRoutes);
export default router;
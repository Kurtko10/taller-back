import express from "express";
import { authController } from "../controllers/authController";

const router = express.Router();

//Nuevo usuario

router.post("/register", authController.register);

// Inicio sesión

router.post("/login",authController.login);



export default router;
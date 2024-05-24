import express from "express";
import { userController } from "../controllers/userController";

const router = express.Router();
//-----------------
// Route to get all users
router.get("/", userController.getAllUsers);


// Ruta para obtener un usuario por ID
router.get("/:id", userController.getById);

// Obtener todos los clientes
router.get("/role/clients", userController.getByClientRole);

// Obtener todos los clientes
router.get("/role/managers", userController.getByManagerRole);


// Crear usuario
router.post("/",userController.create);
// Actualizar usuario por ID
router.put("/:id",userController.update);

// Eliminar usuario
router.delete("/:id",userController.delete);


export default router;


import express from "express";
import { userController } from "../controllers/userController";
import { auth } from "../middlewares/auth";

const router = express.Router();
//-----------------
// Ruta obtener todos los usuarios
router.get("/", userController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get("/:id", userController.getById);

// Obtener todos los clientes
router.get("/role/clients", userController.getByClientRole);

// Obtener todos los clientes
router.get("/role/managers", userController.getByManagerRole);


// Crear usuario
router.post("/",userController.create);//admin
// Actualizar usuario por ID
router.put("/:id",userController.update);//admin

// Eliminar usuario
router.delete("/:id",userController.delete);//admin

// Ver perfil personal de usuario
router.get("/profile/profile",auth,userController.getProfile);//user

// Actualizar perfil personal usuario
router.put("/profile/profile", auth, userController.updateProfile);//user


export default router;


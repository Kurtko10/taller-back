import express from "express";
import { userController } from "../controllers/userController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = express.Router();
//-----------------
// Ruta obtener todos los usuarios
router.get("/",auth,authorize(["manager"]), userController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get("/:id",auth,authorize(["manager"]), userController.getById);

// Obtener todos los clientes
router.get("/role/clients",auth,authorize(["manager"]), userController.getByClientRole);

// Obtener todos los trabajadores
router.get("/role/managers", userController.getByManagerRole);

// Ver perfil personal de usuario
router.get("/profile/profile",auth,userController.getProfile);//user


// Crear usuario
router.post("/",auth,authorize([]),userController.create);//admin

// Actualizar usuario por ID
router.put("/:id",auth,authorize([]),userController.update);//admin

// Eliminar usuario
router.delete("/:id",auth,authorize(["user"]),userController.delete);//admin

// Actualizar perfil personal usuario
router.put("/profile/profile",auth, userController.updateProfile);


export default router;


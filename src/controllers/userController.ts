import { Request, Response } from "express";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { Auth } from "typeorm";
import { Like } from "typeorm";
import bcrypt from "bcrypt"
import { UserRoles } from "../constants/UserRoles";
import { tr } from "@faker-js/faker";

export const userController ={


    // Obtener todos los usuarios
      async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const [users, totalUsers] = await User.findAndCount({
                relations:{
                    role:true,
                },
            }); 
            if (totalUsers === 0) {
                res.status(404).json({ message: "Users not found" });
                return;
              }
            res.json(users); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
      },

       // Obtener usuario por ID
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);

            if (isNaN(userId) || userId <= 0) {
                res.status(400).json({ message: "Invalid user ID" });
                return;
            }

            const user = await User.findOne({
                relations: {
                    role: true,
                },
                where: { id: userId },
            });

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            console.log("Tu usuario",user);
            
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve user" });
        }
    },

      // Ver clientes por ID client
      async getByClientRole(req: Request, res: Response): Promise<void> {
        try {
            const roleId = 3; 
    
            const users = await User.find({
                where: {
                    role: { id: roleId }
                }
            });
    
            if (users.length === 0) {
                res.status(404).json({ message: "No users found with this role" });
                return;
            }
    
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // Mostrar usuarios por ID de rol-------
    async getByManagerRole(req: Request, res: Response): Promise<void> {
        try {
            const roleId = 2; 
    
            const users = await User.find({
                where: {
                    role: { id: roleId }
                }
            });
    
            if (users.length === 0) {
                res.status(404).json({ message: "No users found with this role" });
                return;
            }
    
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },


      // Eliminar usuario
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);

      const deleteResult = await User.delete(userId);

      if (deleteResult.affected === 0) {
        res.status(404).json({ message: "Usuario no existe" });
        return;
      }

      res.status(200).json({ message: `Usuario con ID: ${userId} ELIMINADO`});
    } catch (error) {
      res.status(500).json({ message: "Error al borrar" });
    }
  },

       // Crear usuario
       async create(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email, phone, password, province, isActive, roleId, workerType } = req.body;
            console.log("Datos recibidos:", JSON.stringify(req.body, null, 2));

            if (!firstName || !lastName || !phone || !email || !password || isActive === undefined || !roleId) {
                res.status(400).json({ message: "All fields must be provided" });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const role = await Role.findOne({ where: { id: roleId } });
            if (!role) {
                res.status(400).json({ message: "Invalid role ID" });
                return;
            }

            const newUser = User.create({
                firstName: firstName,
                lastName: lastName,
                province: province,
                email: email,
                phone: phone,
                password: hashedPassword,
                isActive: isActive,
                role: role,
                avatar: "https://avatars.githubusercontent.com/u/27661552", // Valor por defecto para avatar
            });

            if (role.name === 'manager') {
                const validWorkerTypes = ['mechanic', 'quick_service', 'painter', 'bodyworker'];
                if (!workerType || !validWorkerTypes.includes(workerType)) {
                    res.status(400).json({ message: "Invalid or missing worker type for manager role" });
                    return;
                }
                newUser.workerType = workerType;
            }

            await newUser.save();

            res.status(201).json({ message: "User has been created", user: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear usuario" });
        }
    },

    // Actualizar datos de usuario
async  update(req: Request<{ id: string }, {}, Partial<User>>, res: Response): Promise<void> {
    try {
        const userId = Number(req.params.id);
        const { password, role, ...userData } = req.body;
  
        const userToUpdate = await User.findOne({
            where: { id: userId },
        });
  
        if (!userToUpdate) {
            res.status(404).json({ message: "User not found" });
            return;
        }
  
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userToUpdate.password = hashedPassword;
        }
  
        const updateUser: Partial<User> = {
          ...userToUpdate,
          ...userData,
        };
  
        await User.save(updateUser);
  
        res.status(202).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update user" });
    }
  },

    // Ver perfil usuario-----------

    async getProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.tokenData.userId;
    
            console.log(userId);
     
            const user = await User.findOne({
                relations: ["role"],
                where: { id: userId }
            });
    
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
    
            
            
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve user profile" });
        }
    },

    
// Actualizar perfil

async updateProfile(
    req: Request<{ }, {}, Partial<User>>,
    res: Response
  ): Promise<void> {
    const userId = Number(req.tokenData.userId);
    
    // Verifica si userId es un número válido
    if (isNaN(userId) || !userId) {
      console.error('Invalid user ID in updateProfile:', req.tokenData.userId);
      res.status(400).json({ message: "patata" });
      console.log(userId);
      
      return;
    }
  
    try {
      console.log('Token Data in request:', req.tokenData);
      console.log('User ID from token in updateProfile:', req.tokenData.userId);
      console.log('Converted User ID in updateProfile:', userId);
  
      console.log('Proceeding with valid user ID:', userId);
  
      const { password, role, ...resUserData } = req.body;
  
      console.log('Request body:', req.body);
  
      const userToUpdate = await User.findOne({
        where: { id: userId },
      });
  
      console.log('User to update:', userToUpdate);
  
      if (!userToUpdate) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        userToUpdate.password = hashedPassword;
      }
  
      Object.assign(userToUpdate, resUserData);
  
      console.log('Updated user object before saving:', userToUpdate);
  
      await User.save(userToUpdate);
      console.log('Updated User in updateProfile:', userToUpdate);
  
      res.status(202).json({ message: "User update successful" });
    } catch (error) {
      console.error('Error in updateProfile:', error);
      res.status(500).json({ message: "Failed to update user" });
    }
  },


  
  





}
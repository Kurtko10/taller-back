import { Request, Response } from "express";
import { User } from "../models/User";
import { Role } from "../models/Role";
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





}
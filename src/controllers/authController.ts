import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import jwt from "jsonwebtoken";
import { TokenData } from "../types/types";

// -----------------------------------------------------------------------------

export const authController = {
    // registrar un nuevo usuario
    async register(req: Request, res: Response): Promise<void> {
        try {
         
         const { firstName, lastName, email, phone, password, province, isActive } = req.body;
         const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
         if (!firstName || !lastName || !password || !province || !emailReg.test(email)) {
             res.status(400).json({
                 message: "Datos de registro incorrectos",
             });
             return;
         }

            const hashedPassword = bcrypt.hashSync(password, 10);

            // Crear y guardar el usuario
            const newUser = User.create({
               firstName: firstName,
               lastName: lastName,
               email: email,
               phone: phone||null,
               password: hashedPassword,
               isActive: isActive|| true,
               role:UserRoles.CLIENT,
               avatar: "https://avatars.githubusercontent.com/u/27661552", // Valor por defecto para avatar
               province: province
            });
            
            await newUser.save();
            
            res.status(201).json({
                message:  "¡Gracias por registrarte!",
                
                
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al registrar el usuario"
                
            });
        }
    },

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    message: "All fields must be provided",
                });
                return;
            }

            const user = await User.findOne({
                relations: { role: true },
                select: { id: true, email: true, password: true, firstName: true },
                where: { email: email },
            });
            if (!user) {
                res.status(400).json({
                    message: "Bad credentials",
                });
                return;
            }

            const isPasswordMatch = bcrypt.compareSync(password, user.password);
            if (!isPasswordMatch) {
                res.status(400).json({
                    message: "Bad credentials",
                });
                return;
            }

            const tokenPayload: TokenData = {
                userId: user.id,
                userRole: user.role.name,
                userName: user.firstName,
            };

            const token = jwt.sign(
                tokenPayload,
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "10h",
                }
            );

            res.status(200).json({
                message: "Login successfully",
                token,
                user,
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to login user",
                error: (error as any).message,
            });
        }
    },
   };
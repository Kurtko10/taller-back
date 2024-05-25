import { Request, Response } from "express";
import { Car } from "../models/Car";
import { User } from "../models/User";


export const carController = {
     // Obtener todos los coches con la información de los usuarios asociados
     async getAllCars(req: Request, res: Response): Promise<void> {
        try {
            const cars = await Car.find({
                relations: ["userCars", "userCars.user"], // Cargar relaciones necesarias
            });

            const result = cars.map(car => ({
                id: car.id,
                licensePlate: car.licensePlate,
                carBrand: car.carBrand,
                model: car.model,
                year: car.year,
                users: car.userCars.map(userCar => ({
                    firstName: userCar.user.firstName,
                    lastName: userCar.user.lastName,
                    email: userCar.user.email,
                    phone: userCar.user.phone,
                })),
            }));

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener los coches" });
        }
    },
};

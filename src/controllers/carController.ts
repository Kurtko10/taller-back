import { Request, Response } from "express";
import { Car } from "../models/Car";
import { User } from "../models/User";
import { UserCar } from "../models/UserCar";


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
    // Ver vehículos de un usuario
    async getUserCar(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.tokenData.userId;
        console.log('User ID:', userId);

        const user = await User.findOne({
            where: { id: userId },
            relations: ['userCars', 'userCars.car'],
        });

        console.log('User:', user);

        if (!user || !user.userCars || user.userCars.length === 0) {
            res.status(404).json({ message: "No car" });
            return;
        }

        const userCars = user.userCars.map(userCar => ({
            id: userCar.car.id,
            licensePlate: userCar.car.licensePlate,
            carBrand: userCar.car.carBrand,
            model: userCar.car.model,
            year: userCar.car.year,
        }));

        const result = {
            userId: user.id,
            firstName: user.firstName,
            email: user.email,
            phone: user.phone,
            cars: userCars
        };
        console.log(result);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in getUserCar:', error);
        res.status(500).json({
            message: "Failed to retrieve car",
        });
    }
    },

    async getCarsByUserId(req: Request, res: Response): Promise<void> {
        try {
            // Verificar token para autorización
            const tokenData = req.tokenData;
            console.log('Token Data:', tokenData);
    
            // Obtener userId de la URL y convertirlo a número
            const userId = Number(req.params.userId);
            console.log('User ID:', userId);
    
            if (isNaN(userId)) {
                res.status(400).json({ message: "Invalid user ID" });
                return;
            }
    
            // Buscar el usuario y sus coches relacionados
            const user = await User.findOne({
                where: { id: userId },
                relations: ['userCars', 'userCars.car'],
            });
    
            console.log('User:', user);
    
            // Manejar el caso de que no se encuentren coches
            if (!user || !user.userCars || user.userCars.length === 0) {
                res.status(404).json({ message: "No car" });
                return;
            }
    
            // Mapear los coches del usuario para la respuesta
            const userCars = user.userCars.map(userCar => ({
                id: userCar.car.id,
                licensePlate: userCar.car.licensePlate,
                carBrand: userCar.car.carBrand,
                model: userCar.car.model,
                year: userCar.car.year,
            }));
    
            // Preparar la respuesta
            const result = {
                userId: user.id,
                firstName: user.firstName,
                email: user.email,
                phone: user.phone,
                cars: userCars
            };
            console.log(result);
            
            // Enviar la respuesta
            res.status(200).json(result);
        } catch (error) {
            console.error('Error in getCarsByUserId:', error);
            res.status(500).json({
                message: "Failed to retrieve car",
            });
        }
    },
    
    // Función añadir vehículo
async addUserCar(req:Request, res: Response) {
    try {
      const { userId: requestUserId } = req.tokenData;
      const { licensePlate, carBrand, model, year, userId: bodyUserId } = req.body;
  
      // Encuentra al usuario basado en el rol
      let userIdToUse = requestUserId;
  
      if (req.tokenData.userRole === 'manager' || req.tokenData.userRole === 'admin') {
        if (bodyUserId) {
          userIdToUse = bodyUserId;
        }
      }
  
      const user = await User.findOne({ where: { id: userIdToUse } });
  
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      // Crea un nuevo coche
      const newCar = new Car();
      newCar.licensePlate = licensePlate;
      newCar.carBrand = carBrand;
      newCar.model = model;
      newCar.year = year;
  
      await newCar.save();
  
      // Crear la relación UserCar
      const userCar = new UserCar();
      userCar.user = user;
      userCar.car = newCar;
  
      await userCar.save();
  
      const result = {
        userId: user.id,
        firstName: user.firstName,
        email: user.email,
        phone: user.phone,
        car: {
          id: newCar.id,
          licensePlate: newCar.licensePlate,
          carBrand: newCar.carBrand,
          model: newCar.model,
          year: newCar.year,
        },
      };
      console.log("Esto no debe llegar",result);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error in addUserCar:', error);
      res.status(500).json({
        message: "Failed to add car",
      });
    }
  },
  async addUserCarToSpecificUser(req:Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);  // Convertir userId a número
      const { licensePlate, carBrand, model, year } = req.body;
  
      // Encuentra al usuario basado en el userId
      const user = await User.findOne({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Crea un nuevo coche
      const newCar = new Car();
      newCar.licensePlate = licensePlate;
      newCar.carBrand = carBrand;
      newCar.model = model;
      newCar.year = year;
  
      await newCar.save();
  
      // Crear la relación UserCar
      const userCar = new UserCar();
      userCar.user = user;
      userCar.car = newCar;
  
      await userCar.save();
  
      const result = {
        userId: user.id,
        firstName: user.firstName,
        email: user.email,
        phone: user.phone,
        car: {
          id: newCar.id,
          licensePlate: newCar.licensePlate,
          carBrand: newCar.carBrand,
          model: newCar.model,
          year: newCar.year,
        },
      };
      console.log("Esto esta llegando",result);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error in addUserCarToSpecificUser:', error);
      res.status(500).json({
        message: "Failed to add car",
      });
    }
  },
  
    // Función eliminar vehículo

    async deleteUserCar(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.tokenData.userId;
        const carId = Number(req.params.carId);

        if (isNaN(carId)) {
            res.status(400).json({ message: "Invalid car ID" });
            return;
        }

        // Encuentra la relación UserCar
        const userCar = await UserCar.findOne({ where: { user: { id: userId }, car: { id: carId } }, relations: ['car'] });

        if (!userCar) {
            res.status(404).json({ message: "Car not found" });
            return;
        }

        // Elimina la relación UserCar
        await UserCar.remove(userCar);

        // Elimina el coche
        await Car.remove(userCar.car);

        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error('Error in deleteUserCar:', error);
        res.status(500).json({
            message: "Failed to delete car",
        });
    }
    }


    };

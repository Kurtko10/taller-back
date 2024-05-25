import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";
import { AppointmentStatus } from "../constants/AppointmentStatus";
import { ar, faker } from "@faker-js/faker";
import { User } from "../models/User";
import { Between } from "typeorm";
import { Car } from "../models/Car";
import { UserCar } from "../models/UserCar";

export const appointmentController = {

// Ver todas las citas
async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
        const appointments = await Appointment.find({
            relations: ["service", "userWorker", "userClient", "car"]
        });

        if (!appointments || appointments.length === 0) {
            res.status(404).json({ message: "No appointments found" });
            return;
        }

        const formattedAppointments = appointments.map(appointment => ({
            id: appointment.id,
            date: appointment.date,
            status: appointment.status,
            observations: appointment.observations,
            service: appointment.service ? {
                id: appointment.service.id,
                name: appointment.service.name,
            } : null,
            worker: appointment.userWorker ? {
                id: appointment.userWorker.id,
                name: appointment.userWorker.firstName,
                phone: appointment.userWorker.phone
            } : null,
            client: appointment.userClient ? {
                id: appointment.userClient.id,
                name: appointment.userClient.firstName,
                phone: appointment.userClient.phone
            } : null,
            car: appointment.car ? {
                id: appointment.car.id,
                licensePlate: appointment.car.licensePlate,
                carBrand: appointment.car.carBrand,
                model: appointment.car.model,
                year: appointment.car.year
            } : null,
        }));

        res.json(formattedAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},
// Citas de un mecanico
async getAppointmentsByWorkerId(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.tokenData.userId;

        // Encuentra al usuario
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Verifica si el usuario es un trabajador (mecánico)
        if (!user.workerType) {
            res.status(400).json({ message: "User is not a worker" });
            return;
        }

        // Encuentra las citas relacionadas con el trabajador
        const appointments = await Appointment.find({
            where: { userWorker: user },
            relations: ["service", "userClient", "car"]
        });

        if (!appointments || appointments.length === 0) {
            res.status(404).json({ message: "No appointments found for this worker" });
            return;
        }

        const formattedAppointments = appointments.map(appointment => ({
            id: appointment.id,
            date: appointment.date,
            status: appointment.status,
            observations: appointment.observations,
            service: appointment.service ? {
                id: appointment.service.id,
                name: appointment.service.name,
            } : null,
            client: appointment.userClient ? {
                id: appointment.userClient.id,
                name: appointment.userClient.firstName,
                phone: appointment.userClient.phone
            } : null,
            car: appointment.car ? {
                id: appointment.car.id,
                licensePlate: appointment.car.licensePlate,
                carBrand: appointment.car.carBrand,
                model: appointment.car.model,
                year: appointment.car.year
            } : null,
        }));

        res.status(200).json(formattedAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},

// Citas de un usuario
async getAppointmentsByClientId(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.tokenData.userRole === 'admin'|| req.tokenData.userRole === 'manager' && req.params.clientId
            ? parseInt(req.params.clientId)
            : req.tokenData.userId;

        // Encuentra al usuario
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Encuentra las citas relacionadas con el cliente
        const appointments = await Appointment.find({
            where: { userClient: user },
            relations: ["service", "userWorker", "car"]
        });

        if (!appointments || appointments.length === 0) {
            res.status(404).json({ message: "No appointments found for this client" });
            return;
        }

        const formattedAppointments = appointments.map(appointment => ({
            id: appointment.id,
            date: appointment.date,
            status: appointment.status,
            observations: appointment.observations,
            service: appointment.service ? {
                id: appointment.service.id,
                name: appointment.service.name,
            } : null,
            worker: appointment.userWorker ? {
                id: appointment.userWorker.id,
                name: appointment.userWorker.firstName,
                phone: appointment.userWorker.phone
            } : null,
            car: appointment.car ? {
                id: appointment.car.id,
                licensePlate: appointment.car.licensePlate,
                carBrand: appointment.car.carBrand,
                model: appointment.car.model,
                year: appointment.car.year
            } : null,
        }));

        res.status(200).json(formattedAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},
// Obtener una cita por ID
async getAppointmentById(req: Request, res: Response): Promise<void> {
    try {
        const appointmentId = Number(req.params.id);

        if (isNaN(appointmentId)) {
            res.status(400).json({ message: "Invalid appointment ID" });
            return;
        }

        const appointment = await Appointment.findOne({
            where: { id: appointmentId },
            relations: ["service", "userClient", "userWorker", "car"]
        });

        if (!appointment) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }

        const formattedAppointment = {
            id: appointment.id,
            date: appointment.date,
            status: appointment.status,
            observations: appointment.observations,
            service: appointment.service ? {
                id: appointment.service.id,
                name: appointment.service.name,
            } : null,
            worker: appointment.userWorker ? {
                id: appointment.userWorker.id,
                name: appointment.userWorker.firstName,
                phone: appointment.userWorker.phone
            } : null,
            client: appointment.userClient ? {
                id: appointment.userClient.id,
                name: appointment.userClient.firstName,
                phone: appointment.userClient.phone
            } : null,
            car: appointment.car ? {
                id: appointment.car.id,
                licensePlate: appointment.car.licensePlate,
                carBrand: appointment.car.carBrand,
                model: appointment.car.model,
                year: appointment.car.year
            } : null,
        };

        res.status(200).json(formattedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},

 // Crear nueva cita
async  createAppointment(req: Request, res: Response): Promise<void> {
    try {
        const { date, observations, service_id, user_id_client, user_id_worker, car_id } = req.body;

        // Validar el formato de la fecha y hora de la cita
        if (!date || isNaN(new Date(date).getTime())) {
            res.status(400).json({ message: "Invalid date format" });
            return;
        }

        // Convertir la fecha de la cita 
        const appointmentDate = new Date(date);

        // Convertir la hora UTC a la hora local de Madrid
        const localAppointmentDate = new Date(appointmentDate.toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));

        // Verificar si la hora de la cita está dentro del rango permitido (10:00 - 17:59) en la hora local
        const appointmentHour = localAppointmentDate.getHours();
        if (appointmentHour < 9 || appointmentHour >= 19) {
            res.status(400).json({ message: "Appointment time must be between 10:00 and 17:59" });
            return;
        }

        // Validar la existencia y el formato de los IDs de servicio, cliente, trabajador y coche
        if (isNaN(service_id) || isNaN(user_id_client) || isNaN(user_id_worker) || isNaN(car_id)) {
            res.status(400).json({ message: "Invalid service, client, worker, or car ID" });
            return;
        }

        // Buscar el servicio, el cliente, el trabajador y el coche en la base de datos
        const service = await Service.findOne({ where: { id: service_id } });
        const userClient = await User.findOne({ where: { id: user_id_client } });
        const userWorker = await User.findOne({ where: { id: user_id_worker } });
        const car = await Car.findOne({ where: { id: car_id } });

        // Verificar si el servicio, el cliente, el trabajador y el coche existen
        if (!service || !userClient || !userWorker || !car) {
            res.status(404).json({ message: "Service, client, worker, or car not found" });
            return;
        }

        // Verificar que el coche esté asociado con el cliente
        const userCar = await UserCar.findOne({ where: { user: userClient, car: car } });
        if (!userCar) {
            res.status(400).json({ message: "The car is not associated with the client" });
            return;
        }

        // Obtener la duración del servicio
        let appointmentDuration = 4; 
        if (service_id === 2) {
            appointmentDuration = 1;
        } else if (service_id === 3) {
            appointmentDuration = 4; 
        } else if (service_id === 4) {
            appointmentDuration = 1; 
        }

        // Buscar todas las citas existentes del trabajador y del cliente
        const existingAppointments = await Appointment.find({
            where: [
                { userWorker: userWorker },
                { userClient: userClient }
            ],
            relations: ["userWorker", "userClient"]
        });

        // Verificar si hay superposición con las citas existentes
        for (const existingAppointment of existingAppointments) {
            const existingAppointmentDate = new Date(existingAppointment.date);
            const existingAppointmentEnd = new Date(existingAppointmentDate);
            existingAppointmentEnd.setHours(existingAppointmentEnd.getHours() + appointmentDuration); // Consideramos la duración del servicio
            if (appointmentDate >= existingAppointmentDate && appointmentDate < existingAppointmentEnd) {
                res.status(400).json({ message: "Worker or client already has an appointment in the same hour or the following hours" });
                return;
            }
        }

        // Establecer el estado de la cita en función de la fecha y hora actual y de la cita
        let status = AppointmentStatus.PENDING;
        const currentDate = new Date();

        if (appointmentDate < currentDate) {
            status = AppointmentStatus.COMPLETED;
        } else if (appointmentDate.toDateString() === currentDate.toDateString()) {
            status = AppointmentStatus.IN_PROGRESS;
        }

        // Crear la cita con los datos proporcionados
        const appointment = Appointment.create({
            date: appointmentDate,
            status,
            observations,
            service,
            userClient,
            userWorker,
            car
        });

        // Guardar la cita en la base de datos
        await appointment.save();

        // Enviar respuesta con el código 201 y los datos de la cita
        console.log("Code 201: Appointment created successfully");
        res.status(201).json({
            message: "Appointment created successfully",
            appointment
        });
    } catch (error) {
        // Manejar errores internos del servidor
        console.error('Error in createAppointment:', error);
        res.status(500).json({ message: "Internal server error" });
    }
},
// Editar una cita
async updateAppointment(req: Request, res: Response): Promise<void> {
    try {
        const appointmentId = Number(req.params.id);
        const { date, observations, status, service_id, user_id_client, user_id_worker, car_id } = req.body;

        if (isNaN(appointmentId)) {
            res.status(400).json({ message: "Invalid appointment ID" });
            return;
        }

        const appointment = await Appointment.findOne({ 
            where: { id: appointmentId },
            relations: ["service", "userClient", "userWorker", "car"]
        });

        if (!appointment) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }

        if (date) {
            const newDate = new Date(date);
            if (isNaN(newDate.getTime())) {
                res.status(400).json({ message: "Invalid date format" });
                return;
            }
            appointment.date = newDate;

            const appointmentHour = newDate.getHours();
            if (appointmentHour < 10 || appointmentHour >= 18) {
                res.status(400).json({ message: "Appointment time must be between 10:00 and 17:59" });
                return;
            }
        }

        if (observations !== undefined) {
            appointment.observations = observations;
        }

        if (service_id) {
            const service = await Service.findOne({ where: { id: service_id } });
            if (!service) {
                res.status(404).json({ message: "Service not found" });
                return;
            }
            appointment.service = service;
        }

        if (user_id_client) {
            const userClient = await User.findOne({ where: { id: user_id_client } });
            if (!userClient) {
                res.status(404).json({ message: "Client not found" });
                return;
            }
            appointment.userClient = userClient;
        }

        if (user_id_worker) {
            const userWorker = await User.findOne({ where: { id: user_id_worker } });
            if (!userWorker) {
                res.status(404).json({ message: "Worker not found" });
                return;
            }
            appointment.userWorker = userWorker;
        }

        if (car_id) {
            const car = await Car.findOne({ where: { id: car_id } });
            if (!car) {
                res.status(404).json({ message: "Car not found" });
                return;
            }

            const userCar = await UserCar.findOne({ where: { user: appointment.userClient, car: car } });
            if (!userCar) {
                res.status(400).json({ message: "The car is not associated with the client" });
                return;
            }

            appointment.car = car;
        }

        const getStatus = (): AppointmentStatus => {
            const currentDate = new Date();
            if (status && Object.values(AppointmentStatus).includes(status)) {
                return status;
            } else if (appointment.date < currentDate) {
                return AppointmentStatus.COMPLETED;
            } else if (appointment.date.toDateString() === currentDate.toDateString()) {
                return AppointmentStatus.IN_PROGRESS;
            } else {
                return AppointmentStatus.PENDING;
            }
        };

        appointment.status = getStatus();

        await appointment.save(); 

        console.log("Code 200: Appointment updated successfully");
        res.status(200).json({
            message: "Appointment updated successfully",
            appointment: {
                id: appointment.id,
                date: appointment.date,
                status: appointment.status,
                service: appointment.service,
                userClient: appointment.userClient,
                userWorker: appointment.userWorker,
                car: appointment.car,
                observations: appointment.observations
            }
        });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
},

// Eliminar cita por ID
async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
       const appointmentId = Number(req.params.id);

        if (isNaN(appointmentId)) {
            res.status(400).json({ message: "Invalid appointment ID" });
            return;
        }

        const deleteResult = await Appointment.delete(appointmentId);
        if (deleteResult.affected === 0) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }

        res.status(200).json({ message: `Appointment with id ${appointmentId} deleted` });
    } catch (error) {
        console.error('Error in deleteAppointment:', error);
        res.status(500).json({ message: "Error deleting appointment" });
    }
},

};



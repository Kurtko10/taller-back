import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";
import { AppointmentStatus } from "../constants/AppointmentStatus";
import { ar, faker } from "@faker-js/faker";
import { User } from "../models/User";
import { Between } from "typeorm";

export const appointmentController = {


async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
        const appointments = await Appointment.find({
            relations: ["service", "userWorker", "userClient"]
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
}




};



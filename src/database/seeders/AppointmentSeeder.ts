import { Seeder } from "./Seeder";
import { Appointment } from "../../models/Appointment";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { SeederConfig } from "../../config/seeders";
import { Service } from "../../models/Service";
import { Car } from "../../models/Car";
import { User } from "../../models/User";
import { AppointmentStatus } from "../../constants/AppointmentStatus";
import { getRandomValueFromArray } from "../../helpers/common";

export class AppointmentSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { APPOINTMENT } = SeederConfig;

        const services = await Service.find();
        const cars = await Car.find();
        const clients = await User.find({ where: { role: { name: 'user' } } });
        const workers = await User.find({ where: { role: { name: 'manager' } } });

        const appointmentFactory = new AppointmentFactory();
        const appointments = appointmentFactory.createMany(APPOINTMENT);

        const currentDate = new Date(); // Obtener la fecha actual

        appointments.forEach(appointment => {
            appointment.userClient = getRandomValueFromArray(clients);
            appointment.userWorker = getRandomValueFromArray(workers);
            appointment.service = getRandomValueFromArray(services);
            appointment.car = getRandomValueFromArray(cars);

            // Comparar la fecha de la cita con la fecha actual
            if (appointment.date < currentDate) {
                appointment.status = AppointmentStatus.COMPLETED; 
            } else if (appointment.date.toDateString() === currentDate.toDateString()) {
                appointment.status = AppointmentStatus.IN_PROGRESS; 
            } else {
                appointment.status = AppointmentStatus.PENDING;
            }
        });

        await Appointment.save(appointments);
    }
}



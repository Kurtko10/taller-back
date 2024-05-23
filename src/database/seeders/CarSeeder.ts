import { Seeder } from "./Seeder";
import { Car } from "../../models/Car";
import { CarFactory } from "../factories/CarFactory";
import { SeederConfig } from "../../config/seeders";
import { User } from "../../models/User";

export class CarSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { CARS } = SeederConfig;

        // Obtener todos los usuarios
        const users = await User.find();

      
        if (users.length === 0) {
            throw new Error("No users found to assign cars to");
        }

        const carFactory = new CarFactory();
        const cars = [];

        for (let i = 0; i < CARS; i++) {
            const user = users[i % users.length];
            const car = carFactory.generateWithUser(user);
            cars.push(car);
        }

        await Car.save(cars);
    }
}

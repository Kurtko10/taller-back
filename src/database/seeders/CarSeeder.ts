import { Seeder } from "./Seeder";
import { Car } from "../../models/Car";
import { CarFactory } from "../factories/CarFactory";
import { SeederConfig } from "../../config/seeders";

export class CarSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { CARS } = SeederConfig;

        const carFactory = new CarFactory();
        const cars = carFactory.createMany(CARS);

        await Car.save(cars);
    }
}

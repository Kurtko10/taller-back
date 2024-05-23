
import { Car } from "../../models/Car";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

function generateLicensePlate(): string {
    const letters = Array.from({ length: 3 }, () => faker.string.alpha({ casing: 'upper' })).join('');
    const numbers = faker.string.numeric(4);
    return `${letters}-${numbers}`;
}

export class CarFactory extends Factory<Car> {
    protected generate(): Car {
        const pastDate = faker.date.past(20); // Genera una fecha en los últimos 20 años
        return Object.assign(new Car(), {
            licensePlate: generateLicensePlate(),
            carBrand: faker.vehicle.manufacturer(),
            model: faker.vehicle.model(),
            year: pastDate.getFullYear(),
        });
    }
}

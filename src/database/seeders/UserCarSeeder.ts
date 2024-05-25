import { Seeder } from "./Seeder";
import { User } from "../../models/User";
import { Car } from "../../models/Car";
import { UserCar } from "../../models/UserCar";
import { SeederConfig } from "../../config/seeders";

export class UserCarSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { USER_CARS } = SeederConfig;

        const users = await User.find();
        const cars = await Car.find();

        if (users.length === 0 || cars.length === 0) {
            throw new Error("No users or cars found to create associations");
        }

        const userCarEntries: UserCar[] = [];

        // Asegurar que cada coche tenga al menos un usuario sin repetir
        cars.forEach((car, index) => {
            const user = users[index % users.length];
            const userCar = new UserCar();
            userCar.user = user;
            userCar.car = car;
            userCarEntries.push(userCar);
        });

        // Crear asociaciones adicionales asegurando que un coche no tenga más de 2 usuarios
        while (userCarEntries.length < USER_CARS) {
            const randomCar: Car = cars[Math.floor(Math.random() * cars.length)];
            const carUsersCount = userCarEntries.filter(uc => uc.car.id === randomCar.id).length;

            if (carUsersCount < 2) {
                const randomUser: User = users[Math.floor(Math.random() * users.length)];
                const userCar = new UserCar();
                userCar.user = randomUser;
                userCar.car = randomCar;
                userCarEntries.push(userCar);
            }
        }

        await UserCar.save(userCarEntries);

        console.log("Seeding users_cars completed");
    }
}

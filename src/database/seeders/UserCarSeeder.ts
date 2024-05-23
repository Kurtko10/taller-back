import { Seeder } from "./Seeder";
import { User } from "../../models/User";
import { Car } from "../../models/Car";
import { UserCar } from "../../models/UserCar"; 
import { SeederConfig } from "../../config/seeders";

export class UserCarSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { USER_CARS } = SeederConfig;

        // Obtener todos los usuarios y coches
        const users = await User.find();
        const cars = await Car.find();

       
        if (users.length === 0 || cars.length === 0) {
            throw new Error("No users or cars found to create associations");
        }

        const userCarEntries = [];

        for (let i = 0; i < USER_CARS; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomCar = cars[Math.floor(Math.random() * cars.length)];
            userCarEntries.push({
                user_id: randomUser.id,
                car_id: randomCar.id
            });
        }

        await UserCar.save(userCarEntries);

        console.log("Seeding users_cars completed");
    }
}

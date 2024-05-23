
import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { getRandomSubarray } from "../../helpers/common";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";
import { faker } from "@faker-js/faker";

export class UserSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { ADMINS, MANAGERS, CLIENTS } = SeederConfig;

        const userFactory = new UserFactory();

        // Genera usuarios admin
        const adminUsers = userFactory.createMany(ADMINS);
        adminUsers.forEach((user, i) => {
            user.role = UserRoles.ADMIN;
            user.email = `admin${i + 1}@admin.com`;
        });

        // Genera usuarios manager
        const managerUsers = userFactory.createMany(MANAGERS);
        const workerTypes = ['mechanic', 'quick_service', 'painter', 'bodyworker'];
        managerUsers.forEach((user, i) => {
            user.role = UserRoles.MANAGER;
            user.email = `manager${i + 1}@manager.com`;
            user.workerType = faker.helpers.arrayElement(workerTypes) as 'mechanic' | 'quick_service' | 'painter' | 'bodyworker';
        });

        // Genera usuarios cliente
        const clientUsers = userFactory.createMany(CLIENTS);
        clientUsers.forEach((user) => {
            user.role = UserRoles.CLIENT;
        });

        const allUsers = [...adminUsers, ...managerUsers, ...clientUsers];
        await User.save(allUsers);
    }
}

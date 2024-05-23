import { User } from "../../models/User";
import { Role } from "../../models/Role";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { UserRoles } from "../../constants/UserRoles"; // Asegúrate de tener este archivo correctamente configurado

export class UserFactory extends Factory<User>{
    protected generate(): User {
        // Genera un rol aleatorio para el usuario
        const roles = [UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.CLIENT];
        const role = roles[Math.floor(Math.random() * roles.length)];

        // Genera un workerType aleatorio solo si el rol es MANAGER
        const workerTypes = ['mechanic', 'quick_service', 'painter', 'bodyworker'];
        const workerType = role.name === 'manager' ? faker.helpers.arrayElement(workerTypes) : null;

        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            province: faker.location.state(),
            phone: faker.phone.number(),
            password: bcrypt.hashSync("12345678", 10),
            email: faker.internet.email(),
            workerType: workerType as 'mechanic' | 'quick_service' | 'painter' | 'bodyworker' | null,
            avatar: faker.image.avatar(),
            isActive: true,
            role: role
        } as User;
    }
}

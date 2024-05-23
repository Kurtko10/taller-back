import { Role } from "../models/Role";

export const UserRoles = {
    ADMIN: Object.assign(new Role(), { id: 1, name: 'admin' }),
    MANAGER: Object.assign(new Role(), { id: 2, name: 'manager' }),
    CLIENT: Object.assign(new Role(), { id: 3, name: 'user' }),
};
import { faker } from "@faker-js/faker";

export function generateEmailByRoleId(roleId: number): string {
    switch (roleId) {
        case 1:
            return faker.internet.email().replace(/@(.+)$/, '@admin.com');
        case 2:
            return faker.internet.email().replace(/@(.+)$/, '@manager.com');
        case 3:
            return faker.internet.email().replace(/@(.+)$/, '@client.com');
        default:
            return faker.internet.email();
    }
}

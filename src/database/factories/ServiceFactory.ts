import { Service}   from "../../models/Service";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";


export class ServiceFactory extends Factory<Service>{
    public generate(): Service {
        return {
            
            name: faker.helpers.arrayElement([
                "Mecánica General", 
                "Mecánica Rápida",
                "Chapa y pintura",
                "Aire Acondicionado"
            ]),
            description: faker.lorem.text()

        }as Service
    }
}
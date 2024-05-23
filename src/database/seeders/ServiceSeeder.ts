import { Seeder } from "./Seeder";
import { Service } from "../../models/Service";
import { ServiceFactory } from "../factories/ServiceFactory";




export class ServiceSeeder extends Seeder {

    protected async generate(): Promise<void> {
        const serviceFactory = new ServiceFactory();

        
        for (let i = 1; i <= 4; i++) {
            const serviceName = this.getServiceName(i);
            const service = serviceFactory.generate();
            service.name = serviceName;
            
            await Service.save(service);
        }
    }

    private getServiceName(id: number): string {
        switch (id) {
            case 1:
                return "Mecánica General";
            case 2:
                return "Mecánica Rápida";
            case 3:
                return "Chapa y pintura";
            case 4:
                return "Aire Acondicionado";
            default:
                throw new Error(`Servicio con ID ${id} no encontrado.`);
        }
    }
}

                


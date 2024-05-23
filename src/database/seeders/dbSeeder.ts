import { ne } from "@faker-js/faker";
import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { CarSeeder } from "./CarSeeder";
import { ServiceSeeder } from "./ServiceSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";
import { UserCarSeeder } from "./UserCarSeeder";


(async () =>{


    console.log('starting seeders');
    
await new RoleSeeder().start();
await new UserSeeder().start();
await new CarSeeder().start();
await new UserCarSeeder().start();
await new ServiceSeeder().start();
await new AppointmentSeeder().start();
})();
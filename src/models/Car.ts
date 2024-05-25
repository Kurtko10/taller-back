import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { UserCar } from "./UserCar";

@Entity('cars')
export class Car extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "license_plate", length: 10, unique: true })
    licensePlate!: string;

    @Column({ name: "car_brand", length: 100 })
    carBrand!: string;

    @Column({ name: "model", length: 100 })
    model!: string;

    @Column({ name: "year" })
    year!: number;

    @OneToMany(() => Appointment, (appointment) => appointment.car)
    appointments?: Appointment[];

    @OneToMany(() => UserCar, (userCar) => userCar.car)
    userCars!: UserCar[];
}



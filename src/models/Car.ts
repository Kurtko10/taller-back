import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Appointment } from "./Appointment";

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

    //-----------
    @ManyToOne(()=> User, (user) => user.cars)
    @JoinColumn({name: "user_id"})
    user!: User;

    @OneToMany(()=> Appointment, (appointment)=>appointment.service)
    apointments?: Appointment[];

}

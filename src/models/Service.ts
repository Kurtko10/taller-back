import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";


@Entity('services')
export class Service extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "name", length: 100})
    name!: string;

    @Column({ name: "description", type: "text" })
    description!: string;

    //------------------------
    @OneToMany(()=> Appointment, (appointment)=>appointment.service)
    apointments?: Appointment[];
}

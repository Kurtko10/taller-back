import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Car } from "./Car";
import { Service } from "./Service";

@Entity('appointments')
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "datetime" })
    date!: Date;

    @Column({ type: "varchar", length: 50 })
    status!: string;

    @Column({ type: "text", nullable: true })
    observations?: string;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id_client' })
    userClient?: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id_worker' })
    userWorker?: User;

    @ManyToOne(() => Car, { nullable: true })
    @JoinColumn({ name: 'car_id' })
    car?: Car;

    @ManyToOne(() => Service, { nullable: true })
    @JoinColumn({ name: 'service_id' })
    service?: Service;
}

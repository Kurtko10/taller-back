import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Car } from "./Car";
import { Appointment } from "./Appointment";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name:"first_name", length: 50})
    firstName!: string;

    @Column({ name: "last_name", length: 50 })
    lastName!: string;
    
    @Column({ name: "province", length:50 })
    province!: string;

    @Column({ name: "email", unique: true })
    email!: string;


    @Column({ name: "phone", unique: true })
    phone!: string;

    @Column({ name: "password",length:255, select: false })
    password!: string;

    @Column({
        name: 'worker_type',
        type: 'enum',
        enum: ['mechanic', 'quick_service', 'painter', 'bodyworker'],
        nullable: true,
    })
    workerType?: 'mechanic' | 'quick_service' | 'painter' | 'bodyworker';

    @Column({ name: 'avatar', type: 'varchar', nullable: true })
    avatar?: string

    @Column({ name: "is_active" })
    isActive!: boolean;

    //-----------------
    @ManyToOne(()=> Role, (role)=> role.users)
    @JoinColumn({name: 'role_id'})
    role!:Role;

    @OneToMany(() => Car, (car) => car.user)
    cars!: Car[];

    @OneToMany(() => Appointment, (appointment) => appointment.userWorker)
    workerAppointments!: Appointment[];
}

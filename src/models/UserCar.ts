import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Car } from "./Car";

@Entity('users_cars')
export class UserCar extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: number;

    @Column()
    car_id!: number;

    @ManyToOne(() => User, (user) => user.userCars)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Car, (car) => car.userCars)
    @JoinColumn({ name: 'car_id' })
    car!: Car;
}

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    is!: number;

    @Column({name:"first_name"})
    name!: string;
    


    //relaccion de 1 a muchos
    @OneToMany(()=> User, (user)=> user.role)
    users?: User[];
}

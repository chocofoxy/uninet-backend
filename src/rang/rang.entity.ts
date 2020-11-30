import { User } from 'src/user/user.entity';
import { ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn, Column , OneToMany } from 'typeorm';
import { Role } from '../roles/roles.enum';


@Entity()
export class Rang {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(type => User , user => user.rang)
    students: User[];

}

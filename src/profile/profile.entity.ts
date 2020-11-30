import { Rang } from 'src/rang/rang.entity';
import { User } from 'src/user/user.entity';
import { ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn, Column , OneToMany, ManyToOne, OneToOne, ObjectID } from 'typeorm';
import { Role } from '../roles/roles.enum'


@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User , user => user.profile )
    user: User ;

    @Column({ nullable: false })
    feed: string;

}

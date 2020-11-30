import { ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn, Column , OneToMany } from 'typeorm';
import { Role } from '../roles/roles.enum'


@Entity()
export class Club {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    /*@OneToOne(type => User , user => user.club )
    owner: User ;*/

    /*@OneToOne(type => Group , group => group.club )
    group: Group ;*/

}

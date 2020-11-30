import { Profile } from 'src/profile/profile.entity';
import { Rang } from 'src/rang/rang.entity';
import { ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn, Column , OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Role } from '../roles/roles.enum'


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    cin: string;

    @Column({ unique: true })
    email: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column({ default: false})
    valid: boolean;

    /*@Column({ type: 'text', array: true })
    role: Role;*/

    @OneToOne(type => Profile , profile => profile.user )
    profile: Profile ;

    /*@OneToMany(type => Profile , profile => profile.user )
    profile: Profile ;*/

    @ManyToOne(type => Rang , rang => rang.students )
    rang: Rang ;

    constructor( email , password ) {
        this.email = email
        this.password = password
    }

}

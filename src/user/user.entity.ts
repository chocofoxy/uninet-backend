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

    @Column({ default: false })
    valid: boolean;

    @Column({ default: '-' })
    role: string;

    @Column({ default: '-' })
    department: string;

    @OneToOne(type => Profile , profile => profile.user )
    profile: Profile ;

    /*@OneToMany(type => Profile , profile => profile.user )
    profile: Profile ;*/

    @ManyToOne(type => Rang , rang => rang.students )
    rang: Rang ;

    constructor( firstname , lastname , password , cin , email ) {
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.cin = cin
    }

}

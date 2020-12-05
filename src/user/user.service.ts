import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private usersRepository: Repository<User>, private profileService: ProfileService) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find({ where: { isAdmin: false } , relations: [] });
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id, { relations: [] });
    }

    findByUsername(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email: email } , relations: [] });
    }

    async delete(id: number): Promise<any> {
        await this.usersRepository.delete(id)
    }

    async save(user: User): Promise<any> {
        return await this.usersRepository.save(user)
    }

    getPending(): Promise<User[]> {
        return this.usersRepository.find({ where: { valid: false } , relations: [] });
    }

    async activate(id,role,department): Promise<User> {
        let user = await this.findOne(id);
        user.valid = true ;
        user.department = department ;
        user.role = role ;
        //user.profile = await this.profileService.create()
        return this.save(user)
    }
}

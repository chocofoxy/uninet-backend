import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) {}

    async create() : Promise<Profile> {
        const profile = new Profile()
        return this.profileRepository.save(profile)
    }

    async update (id ,photo , dn , bio) : Promise<Profile> {
        const profile = await this.profileRepository.findOne(id)
        profile.bio = bio
        profile.dn = dn
        profile.photo = photo
        profile.seted = true
        return this.profileRepository.save(profile)
    }

}

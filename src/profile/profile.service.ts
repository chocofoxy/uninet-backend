import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { FeedService } from 'src/feed/feed.service';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile> , private feedService : FeedService) {}

    async create() : Promise<Profile> {
        const profile = new Profile()
        const feed = await this.feedService.create()
        profile.feed = feed._id
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

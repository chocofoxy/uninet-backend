import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';

@Injectable()
export class ClubService {

    constructor(@InjectRepository(Club) private ClubRepository: Repository<Club>) {}

    findAll(): Promise<Club[]> {
        return this.ClubRepository.find({ relations: [] });
    }

    findOne(id: string): Promise<Club> {
        return this.ClubRepository.findOne(id, { relations: [] });
    }

    async delete(id: number): Promise<any> {
        await this.ClubRepository.delete(id)
    }

    async save(club: Club): Promise<any> {
        return await this.ClubRepository.save(club)
    }

}

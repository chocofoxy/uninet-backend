import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRangDto } from './dto/create-rang.dto';
import { UpdateRangDto } from './dto/update-rang.dto';
import { Rang } from './entities/rang.schema';

@Injectable()
export class RangService {

  constructor(
    @InjectModel(Rang.name) private RangModel: Model<Rang>
  ){}

  async create(createRangDto: CreateRangDto) {
    return await (new this.RangModel(createRangDto)).save()
  }

  async findAll() {
    return await this.RangModel.find().populate('students')
  }

  async findOne(id) {
    return await this.RangModel.findById(id).populate('groups')
  }

  async findOneRaw(id) {
    return await this.RangModel.findById(id)
  }

  async remove(id) {
    return await this.RangModel.findByIdAndRemove(id)
  }
}

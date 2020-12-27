import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateSaveDto } from './dto/create-save.dto';
import { UpdateSaveDto } from './dto/update-save.dto';
import { Save } from './entities/save.entity';

@Injectable()
export class SaveService {

  constructor(
    @InjectModel(Save.name) private SaveModel: Model<Save> ,
  ){}
  
  create() {
    return (new this.SaveModel()).save()
  }

  async save(id, postId) {
    const collection = await this.findOne(id)
     if ( !collection.saved.includes(postId) )
     collection.saved.push(postId)
     await collection.save()
     return await this.SaveModel.findById(id).populate('saved')
  }

  async findOne(id) {
    return await this.SaveModel.findById(id)
  }

  async savedPosts(id) {
    return await this.SaveModel.findById(id).populate('saved')
  }
  
  async remove(id, postId) {
     const collection = await this.findOne(id)
     if ( collection.saved.includes(postId) )
     collection.saved.splice( collection.saved.indexOf(postId) , 1)
    await collection.save()
    return await this.SaveModel.findById(id).populate('saved')
  }
}

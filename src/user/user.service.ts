import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedService } from 'src/feed/feed.service';
import { NotificationService } from 'src/notification/notification.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfile } from './dto/update-user.dto';
import { Profile } from './entities/profile.schema';
import { User } from './entities/user.schema';
import * as bcrypt from 'bcrypt';
import { RangService } from 'src/rang/rang.service';
import { SaveService } from 'src/save/save.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Profile.name) private ProfileModel: Model<Profile>,
    private saveService: SaveService,
    private feedService: FeedService,
    private rangService: RangService,
    private notificationService: NotificationService
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    const user = new this.UserModel(createUserDto)
    return await user.save()
  }

  async findAll() {
    return this.UserModel.find({ role: { $ne: 'Admin' } , valid: true })//.populate('class')
  }

  async findOne(id) {
    const user = await this.UserModel.findById(id)
    return user
  }

  async findByEmail(email: string) {
    const user = await this.UserModel.findOne({ email: email})
    return this.UserModel.findOne({ email: email})

  }

  async update(id, updateUserDto: UpdateProfile , media ) {
    const user = await this.UserModel.findById(id)
    user.firstname = updateUserDto.firstname || user.firstname
    user.lastname = updateUserDto.lastname || user.lastname
    const profile = await this.ProfileModel.findById(user.profile._id)
    profile.dn = updateUserDto.dn
    profile.bio = updateUserDto.bio
    profile.photo = media || profile.photo
    profile.seted = true 
    await profile.save()
    return await user.save()
  }

  async remove(id) {
    return await this.UserModel.findByIdAndRemove(id)
  }

  async getInformations(id) {
    return await this.UserModel.findById(id)
  }

  async validate(id: string , classId = null , role) {
    const user = await this.UserModel.findById(id)
    const rang = await this.rangService.findOne(classId)
    user.profile = await this.createProfile()
    if ( rang ) {
      user.class = rang
      rang.students.push(user)
      await rang.save()
    }
    user.role = role
    user.notification = await this.notificationService.create()
    user.saves = (await this.saveService.create())._id
    user.valid = true
    await user.save()
  }

  async pending() {
    return await this.UserModel.find({ valid: false , role: { $ne: 'Admin' } })
  }

  async createProfile() {
    const profile = new this.ProfileModel()
    profile.feed = (await this.feedService.create())._id
    return (await profile.save())._id
  }

}

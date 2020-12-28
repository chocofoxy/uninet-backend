import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedService } from 'src/feed/feed.service';
import { PostService } from 'src/post/post.service';
import { RangService } from 'src/rang/rang.service';
import { UserRole } from 'src/roles/roles';
import { UserService } from 'src/user/user.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {

  constructor(
    @InjectModel(Group.name) private GroupModel: Model<Group>,
    private classService: RangService ,
    private feedService: FeedService ,
    private userService: UserService ,
    private postService: PostService,
  ){}
  
  async create(id , createGroupDto: CreateGroupDto) {
    const rang = await this.classService.findOne(createGroupDto.classId)
    const user = await this.userService.findOne(id)
    if ( user.role == UserRole.Teacher && rang ) {
      const group = await (new this.GroupModel({ 
        user: id , 
        name: createGroupDto.name , 
        class: rang._id , 
        feed: await this.feedService.create()
      })).save()
      rang.groups.push(group._id)
      await rang.save()
    } else {
      return new Error(" You are not a teacher or this is deosn't match any class ") }
  }

  findAll(id) {
    return this.GroupModel.find({ user: id }).populate('class')
  }

  all() {
    return this.GroupModel.find().populate('class') 
  }

  async findAllRaw(id) {
    const groups = await this.GroupModel.find({ user: id })
    return  groups.map( group => group._id )
  }

  findOne(id) {
    return this.GroupModel.findById(id).populate(['class','user','feed'])
  }

  async remove( userId , id) {
    const group = await this.findOne(id)
    if ( userId == group.user._id ){
      return await group.remove()
     } else {
      return new Error(" You are not the owner of this group ")
    }
  } 

  async postGroup( id , groupId , content , media = []) {
    const user = await this.userService.findOne(id)
    const rang = await this.classService.findOneRaw(user.class._id)
    if ( rang.groups.includes(groupId) ) {
    const post = await this.postService.create(id,content,media)
    const group = await this.findOne(groupId)
    const groupFeed = await this.feedService.findOne( group.feed._id )
    groupFeed.posts.push(post._id)
    await groupFeed.save() }
  }

}

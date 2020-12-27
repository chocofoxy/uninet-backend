import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedService } from 'src/feed/feed.service';
import { TimelineService } from 'src/timeline/timeline.service';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.schema';
import { Comment } from './entities/comment.schema';
import { Notification } from 'rxjs';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { NotificationService } from 'src/notification/notification.service';
import { Role } from 'src/roles/role.decorator';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(Post.name) private PostModel: Model<Post> ,
    @InjectModel(Comment.name) private CommentModel: Model<Comment> ,
    private notifications: NotificationGateway ,
    private notificationService: NotificationService ,
    private timelineService: TimelineService ,
    private userService: UserService ,
    private feedService: FeedService
  ){}

  async create(id , content , media) {
    return await (new this.PostModel({ user: id , content:content , media:media })).save()
  }

  findAll() {
    return `This action returns all post`;
  }

  async findOne(id) {
    return await this.PostModel.findById(id)
  }

  update(id, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(user , id) {
    const post = await this.PostModel.findById(id)
    if ( post.user._id == user.userId || user.role == "Admin")
    return await post.delete()
  }

  async postGeneral( id , content , mdeia = [] ) {
    const post = await this.create(id, content, mdeia )
    const user = await this.userService.findOne(id)
    const userFeed = await this.feedService.findOne( user.profile.feed._id )
    const generalFeed = await this.feedService.findOne( (await this.timelineService.getTimeline(2)).feed._id )
    userFeed.posts.push(post._id)
    generalFeed.posts.push(post._id)
    await userFeed.save()
    await generalFeed.save()
  }

  async postAdmin( id , content , media = []) {
    const post = await this.create(id,content,media)
    const user = await this.userService.findOne(id)
    const adminFeed = await this.feedService.findOne( (await this.timelineService.getTimeline(1)).feed._id )
    this.notifications.broadcast(user, post._id,"publishied a new post")
    adminFeed.posts.push(post._id)
    await adminFeed.save()
  }

  async downvote(id , postId ) {
    const post = await this.PostModel.findById(postId)
    if ( post.upvotes.includes(id) )
      post.upvotes.splice( post.upvotes.indexOf(id) , 1)
    this.notifications.updatePost( post._id , post)
    return await post.save()
  }

  async upvote(id , postId ) {
    const post = await this.PostModel.findById(postId)
    if ( !post.upvotes.includes(id) ) {          
        post.upvotes.push(id)
        if ( post.user.role != "Admin" )
        this.notifications.onNotifcation(post.user , await this.notificationService.event(id,post._id, "upvoted on one of your posts") )
     }
    this.notifications.updatePost( post._id , post)
    return await post.save()
  }

  async comment(id, content,  postId) {
    const post = await this.PostModel.findById(postId)
    post.comments.push(await (new this.CommentModel({ user: id , content: content})).save())
    await post.save()
    this.notifications.updatePost( post._id , post)
    if ( post.user.role != "Admin" )
    this.notifications.onNotifcation(post.user , await this.notificationService.event(id,post._id, "commented on one of your posts") )
  }


  async deleteComment(id, commentId, postId ) {
    const comment = await this.CommentModel.findById(commentId)
    const post = await this.PostModel.findById(postId)
    if ( comment.user._id == id ) {
      await comment.delete()
      const post = await this.PostModel.findById(postId)
      this.notifications.updatePost( post._id , post)
    }
  }

  async report(id) {
    const reportFeed = await this.feedService.findOne( (await this.timelineService.getTimeline(3)).feed._id )
    if (! (id in reportFeed.posts) ) {
      reportFeed.posts.push( await this.findOne(id) )
      await reportFeed.save()
    }
  }

  async ignore(id) {
    const reportFeed = await this.feedService.findOne( (await this.timelineService.getTimeline(3)).feed._id )
    reportFeed.posts.splice( id  , 1)
    return await reportFeed.save()
  }


}

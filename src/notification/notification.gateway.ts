import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { AuthService } from 'src/auth/auth.service';
import { Event } from './entities/event.schema';
import { Server } from 'socket.io';

@WebSocketGateway({ transports: ['websocket','polling'] , cors: {
  methods: ["GET", "POST"],
  credentials: true
}})
export class NotificationGateway implements OnGatewayConnection {

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly notificationService: NotificationService ,
    private readonly authservice: AuthService ,
  ) {}

  async handleConnection(client: any, ...args: any[]) {
    if (client.handshake.query.token) {
      const user = await this.authservice.verify(client.handshake.query.token);
      if (user) {
        client.join(user._id)
        console.log(user.firstname);
      } else {
        client.disconnect();
      }
    } else {
      client.disconnect();
    }
  }

  
  @SubscribeMessage('openNotification')
  async handleReading(client: any, clear: any) {    
    const user = await this.authservice.verify(client.handshake.query.token);
    await this.notificationService.clear(user.notification._id)
    this.server.to(user._id).emit('notificationOpened',{});
  }

  async onNotifcation( user , event: Event) {
    await this.notificationService.notify(user.notification._id,event)
    
  }

  @SubscribeMessage('JoinPost')
  async JoinPost(client: any, post: any) {  
    console.log(post)  
    client.join(post.id)
  }

  
  async updatePost( id: any, post: any) {  
    this.server.to(id).emit('PostChanged', post );
  }

}

import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  pingTimeout: 5000,
})
export class NotChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private authService: AuthService){}

  @SubscribeMessage('join')
  async joinRoom(data: {token: string, })
}

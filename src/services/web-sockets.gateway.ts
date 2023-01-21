import { WebSocketServer, WebSocketGateway } from '@nestjs/websockets';
import * as socketIo from 'socket.io';

@WebSocketGateway()
export class WebSocketsGateway {
  @WebSocketServer() server: socketIo.Server;
}

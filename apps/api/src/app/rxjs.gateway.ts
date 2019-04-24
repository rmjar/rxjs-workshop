import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Client } from 'socket.io';

@WebSocketGateway()
export class RevealGateway {
  @SubscribeMessage('test')
  handleEvent(client: Client, data: any): TestResponse {
    console.log('test event data', data);
    return {
      name: 'response from gateway on test event',
      data
    };
  }
}

export interface TestResponse {
  name: string;
  data: any;
}

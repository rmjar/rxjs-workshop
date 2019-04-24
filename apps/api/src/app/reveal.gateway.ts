import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse
} from '@nestjs/websockets';
import { Client } from 'socket.io';
const crypto = require('crypto');

@WebSocketGateway()
export class RevealGateway {
  @SubscribeMessage('multiplex-statechanged')
  handleEvent(client: Client, data: any): WsResponse<unknown> {
    if (
      typeof data.secret === 'undefined' ||
      data.secret == null ||
      data.secret === ''
    ) {
      return;
    }
    if (this.createHash(data.secret) === data.socketId) {
      data.secret = null;
      return {
        event: data.socketId,
        data
      };
    }
  }

  createHash(secret) {
    const cipher = crypto.createCipher('blowfish', secret);
    return cipher.final('hex');
  }
}

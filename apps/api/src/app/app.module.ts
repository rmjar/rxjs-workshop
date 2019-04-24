import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RevealGateway } from './reveal.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RevealGateway]
})
export class AppModule {}

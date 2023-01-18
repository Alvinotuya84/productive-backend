/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {OrderModule} from './order.module'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    OrderModule,
    MongooseModule.forRoot('mongodb+srv://mernfullstack:SbJGbLKsI0PQX3cU@cluster0.8b1h2gm.mongodb.net/?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

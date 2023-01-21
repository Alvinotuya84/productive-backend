/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './models/order.model';
import { WebSocketsGateway } from './services/web-sockets.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])],
  controllers: [OrderController],
  providers: [OrderService,WebSocketsGateway],

})
export class OrderModule {}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './models/order.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: orderSchema }])],
  controllers: [OrderController],
  providers: [OrderService],

})
export class OrderModule {}

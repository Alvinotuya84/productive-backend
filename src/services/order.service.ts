// eslint-disable-next-line prettier/prettier

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../models/order.model';
import { WebSocketsGateway } from './web-sockets.gateway';

@Injectable()
export class OrderService {
  doughChefQueue = [];
  toppingChefQueue = [];
  ovenQueue = [];
  waiterQueue = [];

  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<OrderDocument>,
    private readonly webSocketsGateway: WebSocketsGateway,
  ) {}

  async create(toppings: string[]): Promise<OrderDocument> {
    const newOrder = new this.orderModel({ toppings });
    const createdOrder = await newOrder.save();
    // add the created order to the dough chef queue
    this.doughChefQueue.push(createdOrder._id);
    this.processPipeline();
    this.webSocketsGateway.server.emit('newOrder', await this.findAll());
    return createdOrder;
  }

  async findAll() {
    return await this.orderModel.find();
  }

  async findById(id: string) {
    return await this.orderModel.findById(id);
  }

  async update(id: string, order) {
    return await this.orderModel
      .findByIdAndUpdate(id, order, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.orderModel.findByIdAndDelete(id).exec();
  }
  async deleteAll() {
    await this.orderModel.remove();
    this.webSocketsGateway.server.emit(
      'allOrdersDeleted',
      await this.findAll(),
    );
    return 'success deleting all Orders';
  }

  async processPipeline() {
    while (this.doughChefQueue.length > 0) {
      const existingOrder = await this.findById(this.doughChefQueue.shift());
      existingOrder.status = 'in progress';
      await existingOrder.save();
      this.webSocketsGateway.server.emit('ordersChanged', await this.findAll());

      await this.sleep(7000);
      existingOrder.doughPrepTime = 7;
      await existingOrder.save();
      this.webSocketsGateway.server.emit('ordersChanged', await this.findAll());

      this.toppingChefQueue.push(existingOrder._id);
      while (this.toppingChefQueue.length > 0) {
        const existingOrder = await this.findById(
          this.toppingChefQueue.shift(),
        );
        await this.sleep(4000 * existingOrder.toppings.length);
        existingOrder.toppingPrepTime = 4 * existingOrder.toppings.length;
        await existingOrder.save();
        this.webSocketsGateway.server.emit(
          'ordersChanged',
          await this.findAll(),
        );

        this.ovenQueue.push(existingOrder._id);
        while (this.ovenQueue.length > 0) {
          const existingOrder = await this.findById(this.ovenQueue.shift());
          await this.sleep(10000);
          existingOrder.ovenPrepTime = 10;
          await existingOrder.save();
          this.webSocketsGateway.server.emit(
            'ordersChanged',
            await this.findAll(),
          );

          this.waiterQueue.push(existingOrder._id);
          while (this.waiterQueue.length > 0) {
            const existingOrder = await this.findById(this.waiterQueue.shift());
            await this.sleep(5000);
            existingOrder.walkTime = 5;
            existingOrder.timeCompleted = new Date();
            existingOrder.status = 'completed';
            await existingOrder.save();
            this.webSocketsGateway.server.emit(
              'orderCompleted',
              await this.findAll(),
            );
          }
        }
      }
    }
  }
  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

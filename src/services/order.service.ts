/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
    async create(order) {
        const createdOrder = new Order(order);
        return await createdOrder.save();
    }

    async findAll() {
        return await Order.find().exec();
    }

    async findById(id: string) {
        return await Order.findById(id).exec();
    }

    async update(id: string, order) {
        return await Order.findByIdAndUpdate(id, order, { new: true }).exec();
    }

    async delete(id: string) {
        return await Order.findByIdAndDelete(id).exec();
    }

    async processPipeline(order) {
        order.status = 'in progress';
        await order.save();

        await this.sleep(7000);
        order.doughPrepTime = 7;
        await order.save();

        await this.sleep(4000 * order.toppings.length);
        order.toppingPrepTime = 4 * order.toppings.length;
        await order.save();

        await this.sleep(10000);
        order.ovenPrepTime = 10;
        await order.save();

        await this.sleep(5000);
        order.walkTime = 5;
        await order.save();

        order.status = 'completed';
        await order.save();
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

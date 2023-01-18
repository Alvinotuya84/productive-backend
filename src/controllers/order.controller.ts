/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService) {}

    @Post()
    async create(@Body() order) {
        return await this.orderService.create(order);
    }

    @Get()
    async findAll() {
        return await this.orderService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.orderService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() order) {
        return await this.orderService.update(id, order);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.orderService.delete(id);
    }

    @Post('/process')
    async processPipeline(@Body() order) {
        return await this.orderService.processPipeline(order);
    }
}

/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { AxiosResponse } from 'axios';
import axios from 'axios';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService) {}

    @Post()
    async create(@Body('toppings') toppings:string[]) {
        let clientIp=null;
        try {
            const response: AxiosResponse = await axios.get('http://checkip.dyndns.org');
             clientIp = response.data.split(': ')[1].split('<')[0];

          } catch (err) {
            console.log(err);
          }

        return await this.orderService.create(toppings,clientIp);
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

    @Delete()
    async deleteAll() {
        return await this.orderService.deleteAll();
    }
}

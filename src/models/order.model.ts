/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  model } from 'mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order{
    @Prop({required: true})
    toppings: string[];
    @Prop({default: 0})
    doughPrepTime: number;
    @Prop({default: 0})
    toppingPrepTime: number;
    @Prop({default: 0})
    ovenPrepTime: number;
    @Prop({default: 0})
    walkTime: number;
    @Prop({default: 'pending'})
    status: string;
    @Prop({default: null})
    timeCompleted: Date;
    @Prop({default: new Date()})
    timeStarted: Date;
    @Prop({default: null})
    ipaddress: string;


};


export const OrderSchema = SchemaFactory.createForClass(Order);

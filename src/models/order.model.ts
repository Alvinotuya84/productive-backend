/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

export const orderSchema = new Schema({
    toppings: { type: [String], required: true },
    doughPrepTime: { type: Number, default: 0 },
    toppingPrepTime: { type: Number, default: 0 },
    ovenPrepTime: { type: Number, default: 0 },
    walkTime: { type: Number, default: 0 },
    status: { type: String, default: 'pending' },
});

export const Order = model('Order', orderSchema);

import mongoose from 'mongoose';
import { CouponModel, OwnCouponModel } from '../models/coupon';
import { ObjectId } from 'bson';

export async function couponAdd(blockId: string, imageUrl: string, title: string) {
    try {
        return await CouponModel.create({
            blockId: blockId,
            imageUrl: imageUrl,
            title: title
        });
    } catch (err) {
        throw err;
    }
}

export async function couponList() {
    try {
        return await CouponModel.find();
    } catch (err) {
        throw err;
    }
}

export async function owncouponAdd(blockId: string, userId: string, expireDate?: Date) {
    try {
        let display = await CouponModel.find({blockId: blockId});
        let createData:any = {
            blockId: blockId,
            userId: userId
        };
        if(display.length !== 0) createData["display"] = display[0]._id;
        if(expireDate) createData["expireDate"] = expireDate;

        return await OwnCouponModel.create(createData);
    } catch (err) {
        throw err;
    }
}

export async function owncouponList(userId: string) {
    try {
        return await OwnCouponModel.find({userId: userId}).populate('display');
    } catch (err) {
        throw err;
    }
}

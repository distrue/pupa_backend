import mongoose from 'mongoose';
import { ObjectId } from 'bson';

export interface OwnCoupon extends mongoose.Document {
  blockId: string;
  userId: string;
  display: ObjectId | Coupon;
  expireDate: Date;
}

export interface Coupon extends mongoose.Document {
  blockId: string;
  imageUrl: string;
  title: string;
}

export interface OneTimeCode extends mongoose.Document {
  code: string;
  coupon: ObjectId | Coupon;
}

const oneTimeSchema = new mongoose.Schema({
  code: {
    type: String,
    default: ""
  },
  coupon: {
    type: ObjectId,
    ref: "Coupon"
  }
})

const ownschema = new mongoose.Schema({
  expireDate: {
    default: Date.now,
    type: Date
  },
  blockId: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    type: String
  },
  display: {
    type: ObjectId,
    ref: "Coupon"
  }
});

const schema = new mongoose.Schema({
  blockId: {
    required: true,
    type: String
  },
  imageUrl: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  }
});

export const OneTimeCodeModel = mongoose.model<OneTimeCode>('OneTimeCode', oneTimeSchema);
export const OwnCouponModel = mongoose.model<OwnCoupon>('OwnCoupon', ownschema);
export const CouponModel = mongoose.model<Coupon>('Coupon', schema);

import mongoose from 'mongoose';

export interface QRcode extends mongoose.Document {
  code: string;
  qrcode: string;
  type: QRtype;
}

type QRtype = 'event' | 'eventRule';

const schema = new mongoose.Schema({
  code: {
    unique: true,
    required: true,
    type: String
  },
  qrcode: {
    unique: true,
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  }
});

export const QRcodeModel = mongoose.model<QRcode>('QRcode', schema);

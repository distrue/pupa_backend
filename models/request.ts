import mongoose from 'mongoose';

export interface Request extends mongoose.Document {
  name: string; 
  count: number;
}

const schema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  count: {
    default: 0,
    type: Number
  }
});

export const RequestModel = mongoose.model<Request>('Request', schema);

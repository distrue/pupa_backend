import mongoose from 'mongoose';

export interface EventRule extends mongoose.Document {
  code: string;
  imageUrl: string;
  reward: any;
  title: string;
  description: string;
}

const schema = new mongoose.Schema({
  code: {
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
  },
  description: {
    type: String
  },
  reward: {
    default: {}
  }
});

export const EventRuleModel = mongoose.model<EventRule>('EventRule', schema);

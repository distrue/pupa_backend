import mongoose from 'mongoose';
import { ObjectId } from 'bson';
import { Review } from './review';

export interface Event extends mongoose.Document {
  title: string; 
  code: string;
  description: string;
  participants: ObjectId[] | Review[];
  blockId: string;
  imageUrl: string;
  expireDate: Date;
  type: EventType;
  reward: any;
}

type EventType = 'in_rule' | 'in_norule' | 'out';

const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  code: {
    required: true,
    type: String
  },
  blockId: {
    default: '',
    type: String
  },
  description: {
    default: "",
    type: String
  },
  imageUrl: {
    default: "",
    type: String
  },
  participants: {
    default: [],
    type: [{
      ref: 'Review',
      type: ObjectId
    }]
  },
  reward: {
    default: {},
    type: Object
  },
  expireDate: {
    default: Date.now,
    type: Date
  },
  type: {
    default: "",
    type: String
  }
});

export const EventModel = mongoose.model<Event>('Event', schema);

import mongoose from 'mongoose';
import { ObjectId } from 'bson';
import { EventRule } from './eventRule';

export interface Attendance extends mongoose.Document {
  userId: string;
  log: Number[];
  eventRule: EventRule;
}

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  log: {
    default: [],
    type: [{
        type: Number
    }]
  },
  eventRule: {
    required: true,
    type: ObjectId,
    ref: 'EventRule'
  }
});

export const AttendanceModel = mongoose.model<Attendance>('Attendance', schema);

import mongoose from 'mongoose';
import { ObjectId } from 'bson';

export interface Keyword extends mongoose.Document {
    phrase: string,
    participants: ObjectId[] | Object[]
};

const schema = new mongoose.Schema({
    phrase: {
        required: true,
        type: String
    },
    participants: {
        default: [],
        type: [{
            ref: 'Review',
            type: ObjectId
        }]
    }
});

export const KeywordModel = mongoose.model<Keyword>('Keyword', schema);

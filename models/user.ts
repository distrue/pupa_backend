import mongoose from 'mongoose';
import { Membership } from './membership';
import { ObjectId } from 'bson';

interface Req {
    imageUrl: String,
    type: String
}

export interface User extends mongoose.Document {
    plusfriendUserKey: String,
    memberships: Membership[],
    requests: Req[]
}

const schema = new mongoose.Schema({
    plusfriendUserKey: {
        required: true,
        type: String
    },
    memberships: {
        default: [],
        type: [{
            ref: 'Membership',
            type: ObjectId
        }]
    },
    requests: [{
        imageUrl: String,
        type: String
    }]
})

export const UserModel = mongoose.model<User>('User', schema);

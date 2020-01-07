import mongoose from 'mongoose';
import { Membership } from './membership';
import { ObjectId } from 'bson';


export interface User extends mongoose.Document {
    plusfriendUserKey: String,
    memberships: Membership[],
    requests: Request[]
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
    requests: {
        default: [],
        type: Object
    }
})

export const UserModel = mongoose.model<User>('User', schema);

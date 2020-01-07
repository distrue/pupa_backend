import mongoose from 'mongoose';

export type MembershipType = 'shy';

export interface Membership extends mongoose.Document {
    name: string;
    description: string;
    coverImgUrl: string;
}

const schema = new mongoose.Schema({
    name: {
        default: '',
        type: String
    },
    description: {
        default: '',
        type: String
    },
    coverImgUrl: {
        default: '',
        type: String
    }
})

export const MembershipModel = mongoose.model<Membership>('Membership', schema);

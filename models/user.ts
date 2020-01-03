import mongoose from 'mongoose';

export interface User extends mongoose.Document {
    kakaoAccount: {},
    nickname: "",
    tmpcode: "",
    access_token: "",
    refresh_token: ""
}

const schema = new mongoose.Schema({
    kakaoAccount: {
        default: {},
        type: Object
    },
    nickname: {
        default: "",
        type: String
    },
    tmpcode: {
        default: "",
        type: String
    },
    access_token: {
        default: "",
        type: String
    },
    refresh_token: {
        default: "",
        type: String
    }
})

export const UserModel = mongoose.model<User>('User', schema);

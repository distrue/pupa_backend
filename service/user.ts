import mongoose from 'mongoose';
import {UserModel} from '../models/user';

export async function update(query: Object, update: Object) {
    return await UserModel.findOneAndUpdate(query, update);
}

export async function create(tmpcode: String) {
    // TODO: 중복 확인
    return await UserModel.create({
        kakaoAccount: {},
        nickname: "",
        tmpcode: tmpcode
    });
}

export async function find(query: Object) {
    // TODO: 중복 확인
    return await UserModel.find(query);
}

export async function remove(query: Object) {
    // TODO: 중복 확인
    return await UserModel.remove(query);
}

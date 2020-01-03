import mongoose from 'mongoose';
import {QRcodeModel} from '../models/qrcode';

export async function add(type: string, code: string, qrcode: string) {
    try {
        return await QRcodeModel.create({
            code: code,
            type: type,
            qrcode: qrcode
        });
    } catch (err) {
        throw err;
    }
}

export async function del(qrcode: string) {
    try {
        return await QRcodeModel.deleteOne({
            qrcode: qrcode
        });
    } catch (err) {
        throw err;
    }
}

export async function read(code: string) {
    try {
        let match = await QRcodeModel.find({qrcode: code});
        if(match.length === 0) return null;
        return match[0];
    } catch (err) {
        throw err;
    }
}

export async function list() {
    try {
        return await QRcodeModel.find({})
    } catch(err) {
        throw err;
    }
}

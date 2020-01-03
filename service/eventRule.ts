import mongoose from 'mongoose';
import {EventRuleModel} from '../models/eventRule';
import {AttendanceModel} from '../models/attendance';


export async function eventRuleAdd(title: string, code: string, description: string, imageUrl: string) {
    try {
        return await EventRuleModel.create({
            title: title,
            code: code,
            description: description,
            imageUrl: imageUrl
        });
    } catch (err) {
        throw err;
    }
}

export async function getEventRule(code: string) {
    try {
        if(!code) return await EventRuleModel.find({});
        return await EventRuleModel.find({code: code});
    } catch (err) {
        throw err;
    }
}

export async function attendanceUpdate(userId: string, code: string) {
    try {
        const now = new Date(Date.now());
        const numDate = now.getFullYear() * 100000 + (now.getMonth() + 1) * 1000 + now.getDate() * 10 + (now.getHours() < 15 ? 1: 2);
        const user = await AttendanceModel.findOne({userId: userId})
        if(user) {
            const idx = user.log.findIndex(item => item === numDate);
            if(idx === 1) return;
            user.log.push(numDate);
            return user.save();
        }
        else { // 존재하지 않을 경우
            const rule = await EventRuleModel.find({code: code});
            return await AttendanceModel.create({
                userId: userId,
                eventRule: mongoose.Types.ObjectId(rule[0]._id),
                log: [numDate]
            });
        }
    } catch (err) {
        throw err;
    }
}

export async function getAttendance(userId: string, objId: string) {
    try {
        return await AttendanceModel.find({
            userId: userId,
            eventRule: mongoose.Types.ObjectId(objId)
        }).populate('eventRule');
    } catch (err) {
        throw err;
    }
}

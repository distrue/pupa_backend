import mongoose from 'mongoose';
import {EventModel} from '../models/event';
import {ObjectId} from 'bson';

export async function add(title: string, code: string, blockId: string, description: string, imageUrl: string) {
    try {
        return await EventModel.create({
            title: title,
            code: code,
            blockId: blockId,
            description: description,
            imageUrl: imageUrl,
            participants: []
        });
    } catch (err) {
        throw err;
    }
}

export async function one(code: string) {
    try {
        if(!code) return null;
        return await EventModel.find({code: code});
    } catch (err) {
        throw err;
    }
}

export async function list(participant: string) {
    try {
        let query: any = {};
        if(participant) {
            let event = await EventModel.find({}).sort("-expireDate").populate({
                path: 'participants',
                select: 'name',
                match: { name: participant }
            });
            return event;
        }
        else {
            return await EventModel.find({}).populate('participants').sort("-expireDate");           
        }
    } catch (err) {
        throw err;
    }
}

export async function targets(code: string, sample: boolean) {
    try {
        let query = { "code": {"$regex": code} };
        if(!sample) return await EventModel.find(query).populate('participants');
        else return await EventModel.aggregate().match({"code": {"$regex": code}}).sample(9).lookup({from: 'reviews', localField: 'participants', foreignField: '_id', as: 'participantObjects'}) 
        //  .unwind('participants') -> participant 배열을 분리; 지금은 필요 없음
        //  .group({"_id":"_id", "participants": { "$push": "$participants" }}) -> 분리한 배열을 묶어줌
    } catch (err) {
        throw err;
    }
}

export async function deleteParticipant(event: ObjectId, participant: ObjectId, reward?: string) {
    try {
        let query = { "_id": event };
        await EventModel.find(query)
        .then(async data => {
            if(data.length === 0) return "";
            let ch = data[0].reward; ch[participant.toHexString()] = undefined;
            let look = data[0].participants; let idx = data[0].participants.findIndex((item:any) => item._id.toHexString() === participant.toHexString());
            if(idx !== -1) look.splice(idx, 1)
            return await EventModel.findOneAndUpdate(query, {$set: {reward: ch, participants: look}})
        });
    } catch (err) {
        throw err;
    }
}

export async function addParticipant(event: ObjectId, participant: ObjectId, reward?: string) {
    try {
        let query = { "_id": event };
        if(reward) {
            await EventModel.find(query)
            .then(async data => {
                if(data.length === 0) return "";
                let ch = data[0].reward; ch[participant.toHexString()] = reward;
                return await EventModel.findOneAndUpdate(query, {$set: {reward: ch}})
            });
        }
        return await EventModel.find(query)
        .then(async ans => {
            if(ans.length === 0) return "";
            let idx = ans[0].participants.findIndex((item:any) => item._id === participant)
            if(idx === -1) {
                return await EventModel.findOneAndUpdate(query, {
                    $push: {participants: participant}
                });
            }
            return ans;
        })
        
    } catch (err) {
        throw err;
    }
}

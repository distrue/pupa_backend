import {KeywordModel} from '../models/keyword';
import { ObjectId } from 'bson';
import { ReviewModel } from '../models/review';

export async function list() {
    try{
        return await KeywordModel.find({})
    }catch(err) {
        throw err;
    }
}

export async function find(phrase: string, random: boolean) {
    try{
        if(random) return await KeywordModel.aggregate([{$sample: {size: 6}}])
        else return await KeywordModel.find({phrase: phrase}).populate('participants')
    }catch(err) {
        throw err;
    }
}

export async function addWord(phrase: string) {
    try{
        return await KeywordModel.create({
            phrase: phrase
        })
    }catch(err) {
        throw err;
    }
}

export async function delWord(phrase: string) {
    try{
        return await KeywordModel.deleteOne({
            phrase: phrase
        })
    }catch(err) {
        throw err;
    }
}

export async function addParticipant(phrase: string, participant: ObjectId) {
    try{
        return await KeywordModel.find({phrase: phrase})
        .then(async ans => {
            if(ans.length === 0) return
            let idx = ans[0].participants.findIndex((item) => item === participant)
            if(idx === -1) ans[0].participants.push(participant)
            console.log(typeof ans[0].participants[0], participant)
            await ans[0].save()
        })
    }catch(err) {
        throw err;
    }
}

export async function deleteParticipant(phrase: string, participant: ObjectId) {
    try{
        return await KeywordModel.find({phrase: phrase})
        .then(async ans => {
            if(ans.length === 0) return
            let idx = ans[0].participants.findIndex((item) => item.toString() === participant.toString())
            console.log(idx)
            if(idx !== -1) ans[0].participants.splice(idx, 1)
            await ans[0].save()
        })
    }catch(err) {
        throw err;
    }
}

export async function crawlParticiapnt(phrase: string) {
    try {
        const result:any[] = [];
        const ans = await ReviewModel.find({})
        ans.forEach(item => {
            if(item.content.match(phrase)) result.push(item._id)
        })
        return await KeywordModel.findOneAndUpdate({phrase: phrase}, {$set: {participants: result}})
    } catch(err) {
        throw err;
    }
}

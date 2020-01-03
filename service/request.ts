import {RequestModel} from '../models/request';

export async function add(name: string) {
    try {
        let request = await RequestModel.find({name: name});
        let item;
        if(request.length === 0) {
            item = new RequestModel({name: name, count: 1});
        }
        else {
            item = request[0]; item.count += 1;
        }
        return item.save();
    } catch (err) {
        throw err;
    }
}

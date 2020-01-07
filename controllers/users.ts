import { UserModel } from '../models/user';
import { MembershipModel } from '../models/membership';

export async function findUser(plusfriendUserKey: string) {
    return await UserModel.findOne({"plusfriendUserKey": plusfriendUserKey});
}

export async function addUser(plusfriendUserKey: string) {
    return await UserModel.create({"plusfriendUserKey": plusfriendUserKey});
}

export async function askRegister(plusfriendUserKey: string, imageUrl: string, reqType: string = 'shy') {
    const user = await UserModel.findOne({"plusfriendUserKey": plusfriendUserKey});
    if(!user) throw Error("user doesn't exists");
    user.requests.push({imageUrl: imageUrl, type: reqType});
    await user.save();
}

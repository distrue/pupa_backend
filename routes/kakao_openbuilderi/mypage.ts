import Express from 'express';
import {
    responseWrapper, 
    listItem, 
    buttonItem,  
    listCard,
    basicCard,
    carousel
} from '../../controllers/common';
import { addUser, findUser, askRegister } from '../../controllers/users';

const Router = Express.Router();

Router.post('/myMembership', async(req:Express.Request, res:Express.Response) => {
    try {
        const user = await findUser(req.body.userRequest.user.properties.botUserKey);
        const carouselItems:any[] = [];
        if(!user) throw Error('user doesn\'nt exists');
        user.memberships.forEach(item => {
            carouselItems.push(basicCard(
                item.name,
                item.description,
                item.coverImgUrl
            ));
        });
        let response;
        if(carouselItems.length === 0) {
            const ansErr = basicCard("","보유 중인 멤버쉽이 없어요","");
            response = responseWrapper([ansErr]);
        }
        else {
            const sel = carousel('basicCard', carouselItems);
            response = responseWrapper([sel]);
        }
        return res.status(200).json(response);
    } catch(err) {
        console.log(err);
        const ansErr = basicCard("","오류가 발생했어요...","");
        const response = responseWrapper([ansErr]);
        return res.status(200).json(response);
    }
});

Router.post('/mypage', async (req:Express.Request, res:Express.Response) => {
    try {
        const user = await findUser(req.body.userRequest.user.properties.botUserKey);
        if(!user) {
            await addUser(req.body.userRequest.user.properties.botUserKey);
        }
        const listItems = [
            listItem("방문기록", "", "https://snuffstatic.s3.ap-northeast-2.amazonaws.com/%E1%84%8C%E1%85%B5%E1%84%83%E1%85%A9.png"),
            listItem("방문도장찍기", "", "https://snuffstatic.s3.ap-northeast-2.amazonaws.com/pupa_logo.png"),
        ];
        const listButtons = [
            buttonItem("block", {label: "my맴버십", messageText: "my맴버십", blockId: "5e06e862b617ea00015a8ffc"}),
            buttonItem("message", {label: "마이쿠폰", messageText: "TBD"})
        ];
        const myList = listCard("마이페이지", "", listItems, listButtons);

        const addButtons = [
            buttonItem("message", {label: "맴버십 신청하기", messageText: "TBD"}),
            buttonItem("message", {label: "이벤트 코드등록", messageText: "TBD"})
        ];
        const addOne = basicCard("","","https://snuffstatic.s3.ap-northeast-2.amazonaws.com/items.png", addButtons);
        const response = responseWrapper([myList, addOne]);
        return res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        const ansErr = basicCard("","오류가 발생했어요...","");
        const response = responseWrapper([ansErr]);
        return res.status(200).json(response);
    }
});

Router.post('/membership_register', async (req:Express.Request, res:Express.Response) => {
    try {
        console.dir(req.body);
        await askRegister(
            req.body.userRequest.user.properties.botUserKey, JSON.parse(req.body.action.params.image).secureUrls
        );
        const okay = basicCard("", `신청이 완료되었습니다!
        심사가 완료되면 "마이페이지>My맴버십"에서 확인할 수 있어요.`, "");
        const response = responseWrapper([okay]);
        return res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        const ansErr = basicCard("","오류가 발생했어요...","");
        const response = responseWrapper([ansErr]);
        return res.status(200).json(response);
    }
});

export default Router;

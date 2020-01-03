import Express from 'express';
import {
    responseWrapper, 
    listItem, 
    buttonItem,  
    listCard,
    basicCard
} from '../../controllers/kakao_openbuilderi/common';

const Router = Express.Router();

Router.post('/mypage', async (req:Express.Request, res:Express.Response) => {
    console.dir(req.body.userRequest.user);

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
});

export default Router;

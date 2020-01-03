import Express from 'express';
const Router = Express.Router();

import {getAttendance, getEventRule} from '../../service/eventRule';
import {fallbackBlock} from '../../controllers/kakao_openbuilderi/common';
import { myScoreBlock, eventRuleBlock } from '../../controllers/kakao_openbuilderi/stamp';


Router.post('/eventRule', (req:Express.Request, res:Express.Response) => {
    let responseBody, find = "";
    if(req.body.action.params.EventName) find = req.body.action.params.EventName.replace(/_/gi, " ");

    getEventRule(find) 
    .then(async data => {
      if(data.length === 0) return responseBody = fallbackBlock("invalid eventCode");
      return responseBody = eventRuleBlock(data[0])
    });
    return res.status(200).send(responseBody);
});

Router.post('/myScore', async (req:Express.Request, res:Express.Response) => {
    let userId = req.body.userRequest.user.id;
    let code = "", responseBody:any;
    if(req.body.action.params.EventName) {
      code = req.body.action.params.EventName.replace(/_/gi, " ");
    }

    let eventRule = await getEventRule(code);
    getAttendance(userId, eventRule[0]._id) 
    .then(data => {
        if(data.length === 0) {
          responseBody = fallbackBlock('아직 적립한 적이 없어요..!');
          responseBody.template.outputs[0].basicCard.buttons = [{
            "action": "message",
            "label": "리워드 보기",
            "messageText": `eventRule ${code}`
          }];
        }
        else responseBody = myScoreBlock(data[0])

        let dataList:any[] = [];
        for(let item in data[0].log) {
          console.log(item)
          dataList.push({
              "action": "block",
              "label": "0개",
              "messageText": `0개 쿠폰 보기`,
              "blockId": "5ddfaa148192ac0001d64a89"
          })
        }
        responseBody.template.quickReplies = dataList;
    })
    return res.status(200).send(responseBody);
});

export default Router;

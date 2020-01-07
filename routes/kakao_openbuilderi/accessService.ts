import Express from 'express';
const Router = Express.Router();

import {one as Eventone} from '../../service/event';
import {read} from '../../service/qrcode';
import {attendanceUpdate} from '../../service/eventRule';
import {owncouponAdd} from '../../service/coupon';
import {OneTimeCodeModel, Coupon} from '../../models/coupon';
import {fallbackBlock} from '../../controllers/common';
import { QREvent, QREventRule } from '../../controllers/kakao_openbuilderi/access';


Router.post('/getQR', (req:Express.Request, res:Express.Response) => {
    try {
        if(!req.body.action.params.qrcode) return res.status(400).send("no qrcode");
        const qrcode = JSON.parse(req.body.action.params.qrcode).barcodeData.toString();
        const userId = req.body.userRequest.user.id;

        read(qrcode)
        .then(async data => {
            let responseBody;
            if(!data) {
                responseBody = fallbackBlock("유효한 qrcode가 아니에요!", "qrcode");
            }
            else if(data.type === 'event') {
                await Eventone(data.code.toString())
                .then(data => {
                    if(data === null || data.length === 0) {
                        return responseBody = fallbackBlock("유효한 qrcode가 아니에요!", "qrcode");
                    }
                    responseBody = QREvent(data[0])
                })
            }
            else if(data.type === 'eventRule') {
                await attendanceUpdate(userId, data.code)
                .then((res:any) => {
                    if(res === null || res.length === 0) {
                        return responseBody = fallbackBlock("적립 오류 발생", "qrcode");
                    }
                    responseBody = QREventRule(data.code)
                })  
            }
            return res.status(200).json(responseBody);
        });
    } catch(err) {
        console.error(err);
        return res.status(500).send("Unintended error occured");
    }
});

// 사용자가 직접 지급받는 경우
Router.post('/giveCoupon', async (req:Express.Request, res:Express.Response) => {
    let blockId, responseBody;
    const userId = req.body.userRequest.user.id;
    
    if(!req.body.action.params.code) {
        responseBody = fallbackBlock("코드를 입력해주세요!", "coupon");
        return res.status(200).json(responseBody);
    }
    
    const code = req.body.action.params.code
    let item = await OneTimeCodeModel.find({code: code}).populate('coupon');
    if(item.length === 0) {
        let responseBody = fallbackBlock("유효한 코드가 아니에요!", "coupon");
        return res.status(200).json(responseBody);
    }
    await OneTimeCodeModel.remove({code: code});
    let coupon:Coupon = item[0].coupon as Coupon;
    if(!coupon) {
        let responseBody = fallbackBlock("유효한 코드가 아니에요!", "coupon");
        return res.status(200).json(responseBody);
    }
    blockId = coupon.blockId;
    
    await owncouponAdd(blockId, userId);
    responseBody = fallbackBlock("쿠폰이 지급되었어요, 내 쿠폰 확인하기에서 확인해 보세요!", "coupon");
    return res.status(200).json(responseBody);
});

export default Router;

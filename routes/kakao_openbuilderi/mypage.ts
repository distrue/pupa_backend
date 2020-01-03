import Express from 'express';
import {basicCard} from '../../controllers/kakao_openbuilderi/common';

const Router = Express.Router();

Router.post('/mypage', async (req:Express.Request, res:Express.Response) => {
    return res.status(200).json(basicCard(`${req.body.userRequest.user.id}: ${req.body.userRequest.user.properties.plusfriendUserKey}`, ''));
});

export default Router;

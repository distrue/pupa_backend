import Express from 'express';

import { listUser } from "../../controllers/users";

const Router = Express.Router();

Router.get('/users', async (req: Express.Request, res: Express.Response) => {
    try {
        return res.status(200).json(await listUser());
    } catch(err) {
        console.error(err);
        return res.status(500).send("error occured");
    }
});

Router.all(/^/, async (req: Express.Request, res: Express.Response) => {
    return res.status(404).send("api does not exists");
})

export default Router;

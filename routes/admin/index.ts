import fs from 'fs';
import path from 'path';
import Express from 'express';

import apiRouter from './api';

const Router = Express.Router();

// check pw, add isLogin on request
Router.post(/^/, (
    req: Express.Request, 
    res:Express.Response, 
    next: Express.NextFunction
) => {
    console.log(req.body);
    if(req.body.pw === 'hilite1!') {
        res.cookie('isAdmin', 'colosus'); // browser dependent file load, JS query
        req.user = {isAdmin: true}; // main request
        return next();
    }
    req.user = {isAdmin: false};
    return res.status(200).render('admin');
});

// wall to block unathorized user
Router.all(/^/, (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    if(req.cookies.isAdmin === 'colosus') return next();
    if(req.user?.isAdmin) return next();
    console.log("not admin");
    return res.status(200).render('admin');
});

// api
Router.use('/api', apiRouter);

// main
Router.all('/', (req:Express.Request, res:Express.Response, next: Express.NextFunction) => {
    req.user = {...req.user, item: "index.html"};
    next();
});

Router.all('/:item', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log(req.params.item);
    req.user = {...req.user, item: req.params.item};
    next();
});

Router.all(/^/, (req:Express.Request, res: Express.Response) =>  {
    const lct = path.join(__dirname, '../../admin/public', req.user.item);
    if(fs.existsSync(lct)) {
        return res.status(200).sendFile(lct);
    }
    return res.status(404).send("Not Found");
});

export default Router;

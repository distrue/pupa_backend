import Express from 'express';
const Router = Express.Router();

Router.post(/^/, (
    req: Express.Request, 
    res:Express.Response, 
    next: Express.NextFunction
) => {
    console.log(req.body);
    if(req.body.pw === 'hilite1!') {
        req.user = {isAdmin: true};
        return next();
    }
    req.user = {isAdmin: false};
    return res.status(200).render('admin');
});

Router.all('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    if(req.user?.isAdmin) return next();
    return res.status(200).render('admin');
});

Router.all('/', (req: Express.Request, res: Express.Response) => {
    return res.status(200).send("TBD");
});

export default Router;

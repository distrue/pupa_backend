import Express from 'express';
import {jwtVerify} from '../tools/jwt';
const Router = Express.Router();

Router.all(/^/, (req: Express.Request, res: Express.Response, next:Express.NextFunction) => {
    const token = req.cookies['X-Access-Token'];
    if(!token) return res.status(200).redirect('/admin/login');
    let decoded:any;
    try {
        decoded = jwtVerify(token);
    }
    catch(err) {
        console.error(err);
        return res.status(403).send(null);
    }
    if(decoded !== "admin") return res.status(403).send(null);
    req.user = {isAdmin: true};
    return next();
})

export default Router;

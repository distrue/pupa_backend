import {default as Instance} from 'express';
import * as Express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {init as configInit} from './config';
import dbinit from './tools/mongodb';

import apiRouter from './routes/kakao_openbuilderi';
import adminRouter from './routes/admin';

const app = Instance();

app.set('view engine', 'ejs');
app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

dbinit();

app.set('trustproxy', 1);
app.use(cors({
	credentials: true, // enable set cookie
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	origin: ['https://13.125.121.5:3000']
  }));
app.use(cookieParser());

configInit();

app.use('/api', apiRouter);
app.use('/admin', adminRouter);

app.get('/', function(req: Express.Request, res: Express.Response){
	res.render('index');
});

app.listen(3000, function(){
	console.log('Connected 3000 port');
});

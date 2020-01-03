import Express  from 'express';
const Router = Express.Router();

// legacy snuff service

import eventService from './eventService';
Router.use(eventService);

import stampService from './stampService';
Router.use(stampService);

import couponService from './couponService';
Router.use(couponService);

import accessService from './accessService';
Router.use(accessService);

export default Router;

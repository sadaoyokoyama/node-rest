import express from 'express';
import productsRoute from './products';
import usersRoute from './users';
import oauthRoute from './oauth';
import * as oauth from './../controllers/oauth/oauth';

const router = express.Router();

router.use('/products', oauth.authenticate, productsRoute);
router.use('/users', oauth.authenticate, usersRoute);
router.get('/', oauth.authenticate, (req, res) => res.send('H W'));
router.use('/oauth', oauthRoute);

export default router;
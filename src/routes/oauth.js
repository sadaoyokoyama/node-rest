import express from 'express';
import * as oauth from '../../src/controllers/oauth/oauth';
import OAuthClientController from '../../src/controllers/oauth/client';
import OAuthClient from '../../src/models/oauth/oauth_client';

const router = express.Router();

const oAuthClientController = new OAuthClientController(OAuthClient);

router.use('/token', oauth.token);

router.post('/authorize', oauth.authorize);
router.get('/authorize', oauth.authorize);

router.use('/callback', (req, res, next) => res.send(req.query));

router.get('/client', (req, res) => oAuthClientController.get(req, res));
router.post('/client', (req, res) => oAuthClientController.create(req, res));

export default router;

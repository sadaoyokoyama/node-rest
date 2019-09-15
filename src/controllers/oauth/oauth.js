import OAuth2Server from 'oauth2-server';
import * as model from '../../models/oauth/oauth';

const oauth = new OAuth2Server({ model: model });

module.exports.authenticate = (req, res, next) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  
  oauth.authenticate(request, response)
    .then((token) => {
      Object.assign(req, { user: token });
      next();
    })
    .catch(err => next(err));  
}

module.exports.authorize = (req, res, next) => {
  if (req.method == 'GET') {
    res.render('authorize');
  } else {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);

    oauth.authorize(request, response)
      .then((authorizationCode) => {
        res.status(response.status).set(response.headers).end();
      }).catch(err => next(err));
  }
}

module.exports.token = (req, res, next) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  oauth.token(request, response)
    .then((token) => {
      res.set(response.headers);
      res.json(response.body);
    }).catch(err => next(err));
};

import AuthorizationCode from './authorization_code';
import OAuthToken from './oauth_token';
import OAuthClient from './oauth_client';
import User from '../../models/user';
import bcrypt from 'bcrypt';

module.exports.getAccessToken = accessToken => {
  return OAuthToken.findOne({ accessToken }).then(token => token);
}

module.exports.getClient = (clientId, clientSecret) => {
  let params = { clientId };
  
  if (clientSecret) {
    params.clientSecret = clientSecret;
  }

  return OAuthClient.findOne(params).lean()
    .then(client => {
      return {
        id: client.clientId,
        redirectUris: client.redirectUris,
        grants: client.grants
      };
    });
}

module.exports.getUserFromClient = client => {
  return User.findOne({ _id: client.user_id }).lean()
    .then(user => {
      if (user == null) {
        user = { _id: '1234' };
      }

      return user;
    });
}

module.exports.getRefreshToken = refreshToken => OAuthToken.findOne({ refreshToken }).lean();

module.exports.getUser = (username, password) => {
  return User.findOne({ username }).lean()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      }

      return false;
    });
}

module.exports.getAuthorizationCode = authCode => {
  return AuthorizationCode.findOne({ authorizationCode: authCode }).lean()
    .then(code => {
      return Promise.all([
        code,
        OAuthClient.findOne({ client_id: code.client_id }),
        User.findOne({ _id: code.userId })
      ]);
    })
    .spread((code, client, user) => {
      return {
        code: code.authorizationCode,
        expiresAt: code.expiresAt,
        redirectUri: code.redirectUri,
        scope: code.scope,
        client: { id: client.clientId },
        user: user
      };
    });
};

module.exports.revokeAuthorizationCode = code => {
  return AuthorizationCode.deleteOne({ authorizationCode: code.authorizationCode })
    .then(authorizationCode => !!authorizationCode);
}

module.exports.saveAuthorizationCode = (code, client, user) => {
  let authCode = {
    authorizationCode: code.authorizationCode,
    expiresAt: code.expiresAt,
    redirectUri: code.redirectUri,
    scope: code.scope,
    clientId: client.id,
    userId: user._id
  };
  
  let auth = new AuthorizationCode(authCode);

  return auth.save(authCode)
    .then(authorizationCode => {
      return {
        authorizationCode: authorizationCode.authorizationCode,
        expiresAt: authorizationCode.expiresAt,
        redirectUri: authorizationCode.redirectUri,
        scope: authorizationCode.scope,
        client: {id: authorizationCode.clientId},
        user: {id: authorizationCode.userId}
      };
    });
}

module.exports.saveToken = (token, client, user) => {
  let accessToken = new OAuthToken({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client : client,
    clientId: client.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    user : user,
    userId: user._id,
  });

  return new Promise((resolve, reject) => {
    accessToken.save((err, data) => {
      if (err) reject(err)

      else resolve(data)
    })
  }).then(saveResult => {
    return saveResult
  })
};

import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    authorizationCode: String,
    expiresAt:  { type: Date },
    redirectUri: String,
    scope: String,
    clientId: String,
    userId: String
});

schema.set('toJSON', {
    transform: (doc, ret, options) => ({
        authorizationCode: ret.authorizationCode,
        expiresAt:  ret.expiresAt,
        redirectUri: ret.redirectUri,
        scope: ret.scope,
        clientId: ret.client.id,
        userId: ret.user.username
    })
});

const AuthorizationCode = mongoose.model('AuthorizationCode', schema, 'AuthorizationCode');

export default AuthorizationCode;
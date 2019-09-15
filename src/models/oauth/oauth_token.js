import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    accessToken: { type: String },
    accessTokenExpiresAt: { type: Date },
    client : { type: Object },
    clientId: { type: String },
    refreshToken: { type: String },
    refreshTokenExpiresAt: { type: Date },
    user : { type: Object },
    userId: { type: String },
});

const OAuthToken = mongoose.model('OAuthToken', schema, 'OAuthToken');

export default OAuthToken
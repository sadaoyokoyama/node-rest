import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    clientId: { type: String },
    clientSecret: { type: String },
    redirectUris: { type: Array },
    grants: { type: Array }
});

const OAuthClient = mongoose.model('OAuthClient', schema, 'OAuthClient');

export default OAuthClient;

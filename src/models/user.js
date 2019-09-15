import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: Array },
    username: { type: String }
});

const User = mongoose.model('User', schema, 'User');

export default User;

const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'User must have a First Name.'],
        minlength: [2, 'User\'s first name should have more than two letters.']
    },
    lastName: { type: String, required: [true, 'User must have a Last Name.'] },
    lastLoginDate: { type: Date },
    isLockedOut: { type: Boolean, default: false },
    invalidLoginTries: { type: Number, default: 0 }
}, { timestamps: true });

const UserModel = model('user', userSchema, 'users');

module.exports = {
    UserModel,
    userSchema
}
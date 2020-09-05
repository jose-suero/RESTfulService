const { Schema, model, Types: { ObjectId } } = require('mongoose');
const { UserModel } = require('../user');

const identitySchema = new Schema({
    userId: {
        type: ObjectId,
        ref: UserModel,
        required: true
    },
    providerName: {
        type: String,
        required: true
    },
    providerKey: {
        type: String,
        required: true
    },
    lastUseDate: {
        type: Date
    },
    invalidTries: {
        type: Number,
        default: 0
    },
    password: {
      type: String
    }
}, { timestamps: true });

identitySchema.index({
    providerName: 1, providerKey: 1
}, { unique: true });

const IdentityModel = model('identity', identitySchema, 'identities');

module.exports = {
    IdentityModel,
    identitySchema
}
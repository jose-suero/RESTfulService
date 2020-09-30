const { IdentityModel } = require('../../models/identity');
const { UserModel } = require('../../models/user');
const { checkPassword } = require('../../../lib/hash-utils');
const { createToken } = require('./create-token');
const { AppError } = require('../../common');

exports.loginEmail = async (model) => {
  const { email, password } = model;

  const identity = await IdentityModel.findOne({
    providerKey: email,
    providerName: 'email'
  });

  if (identity) {
    const userPromise = UserModel.findById(identity.userId);
    
    const user = await userPromise;
    if (user.isLockedOut) {
      throw new AppError('User is Locked out!', 401);
    }
    
    const pwdOk = await checkPassword(password, identity.password);
    if (pwdOk) {
      user.isLockedOut = false;
      user.invalidLoginTries = 0;
      user.lastLoginDate = new Date();
      
      identity.lastUseDate = new Date();
      identity.invalidTries = 0;
      
      const actions = [
        createToken(identity.userId),
        identity.save(),
        user.save()
      ];
      
      const results = await Promise.all(actions);
      
      return { token: results[0] };
    }

    identity.invalidTries = (identity.invalidTries || 0) + 1;
    user.invalidLoginTries = (user.invalidLoginTries || 0) + 1;
    if (user.invalidLoginTries >= 3) {
      user.isLockedOut = true;
    }
    await Promise.all([identity.save(), user.save()]);
    //Let fall into the throw error below.
  }

  throw new AppError('Invalid login attempt.', 401);
}
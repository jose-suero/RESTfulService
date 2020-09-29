const { setupControllerMiddleware } = require('@josesjs/model-mapper');
const { loginEmailInViewmodel } = require('./viewmodels/login-email-in-viewmodel');
const { loginEmailOutViewmodel } = require('./viewmodels/login-email-out-viewmodel');
const { IdentityModel } = require('../../../models/identity');
const { UserModel } = require('../../../models/user');
const { AppError } = require('../../../common');
const { checkPassword } = require('../../../../lib/hash-utils');
const { createToken } = require('../functions/create-token');
const db = require('mongoose');

exports.loginEmail = setupControllerMiddleware(
  loginEmailInViewmodel,
  loginEmailOutViewmodel,
  async (req, res, next) => {
    const { email, password } = req.mappedBody;

    const identity = await IdentityModel.findOne({
      providerKey: email,
      providerName: 'email'
    });

    if (identity) {
      const userPromise = UserModel.findById(identity.userId);

      const user = await userPromise;
      if (user.isLockedOut) {
        return next(new AppError('User is locked out.', 401));
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
        
        res.mappedBody = { token: results[0] };
        return next();
      }

      identity.invalidTries = (identity.invalidTries || 0) + 1;
      user.invalidLoginTries = (user.invalidLoginTries || 0) + 1;
      if (user.invalidLoginTries >= 3)
        user.isLockedOut = true;
      await Promise.all([identity.save(), user.save()]);
      return next(new AppError('Invalid login attempt.', 401));
    }

    return next(new AppError('Invalid login attempt.', 401));
  }
);

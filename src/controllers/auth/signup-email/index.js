const { setupControllerMiddleware } = require('lib/model-mapper')
const authService = require('../../../services/auth-service');
const { signupEmailInViewmodel } = require('./viewmodels/signup-email-in-viewmodel');
const { signupEmailOutViewmodel } = require('./viewmodels/signup-email-out-viewmodel');
const { createToken } = require('../functions/create-token');

async function signupEmail(req, res, next) {
  const model = req.model;

  try {
    res.model = await authService.signupEmail(model);
    res.model.token = await createToken(res.model.userId, {
      firstname: res.model.firstName
    });
    next();
  } catch (err) {
    next(err);
  }

}

module.exports = {
  signupEmail: setupControllerMiddleware(
    signupEmailInViewmodel,
    signupEmailOutViewmodel,
    signupEmail,
    201)
}
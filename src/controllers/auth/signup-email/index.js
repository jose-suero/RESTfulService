const { setupControllerMiddleware } = require('@josesjs/model-mapper')
const { signupEmail: service } = require('../../../services/auth-service');
const { createToken } = require('../../../services/auth-service/create-token');
const { signupEmailInViewmodel } = require('./viewmodels/signup-email-in-viewmodel');
const { signupEmailOutViewmodel } = require('./viewmodels/signup-email-out-viewmodel');

async function signupEmail(req, res, next) {
  const model = req.mappedBody;

  try {
    res.mappedBody = await service(model);
    res.mappedBody.token = await createToken(res.mappedBody.userId, {
      userId: res.mappedBody.userId,
      email: res.mappedBody.email,
      provider: res.mappedBody.providerName
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
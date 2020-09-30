const { setupControllerMiddleware } = require('@josesjs/model-mapper');
const { loginEmailInViewmodel } = require('./viewmodels/login-email-in-viewmodel');
const { loginEmailOutViewmodel } = require('./viewmodels/login-email-out-viewmodel');
const { loginEmail: service } = require('../../../services/auth-service/login-email');

exports.loginEmail = setupControllerMiddleware(
  loginEmailInViewmodel,
  loginEmailOutViewmodel,
  async (req, res, next) => {
    try {
      res.mappedBody = await service(req.mappedBody);
      next();
    } catch(err) {
      next(err);
    }
  }
);

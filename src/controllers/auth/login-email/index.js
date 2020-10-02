const { setupControllerServiceMiddleware } = require('@josesjs/model-mapper');
const { loginEmailInViewmodel } = require('./viewmodels/login-email-in-viewmodel');
const { loginEmailOutViewmodel } = require('./viewmodels/login-email-out-viewmodel');
const { loginEmail: service } = require('../../../services/auth-service/login-email');

exports.loginEmail = setupControllerServiceMiddleware(
  loginEmailInViewmodel,
  loginEmailOutViewmodel,
  service
)
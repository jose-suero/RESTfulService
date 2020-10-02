const { setupControllerServiceMiddleware } = require('@josesjs/model-mapper')
const { signupEmail: service } = require('../../../services/auth-service');
const { signupEmailInViewmodel } = require('./viewmodels/signup-email-in-viewmodel');
const { signupEmailOutViewmodel } = require('./viewmodels/signup-email-out-viewmodel');

exports.signupEmail = setupControllerServiceMiddleware(
  signupEmailInViewmodel,
  signupEmailOutViewmodel,
  service,
  201
);

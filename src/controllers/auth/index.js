const { signupEmail } = require('./signup-email');

module.exports = {
    attachRoutes: function (router) {
      router.post('/auth/signupemail', signupEmail);
    }
}

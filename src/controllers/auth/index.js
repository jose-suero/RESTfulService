const { signupEmail } = require('./signup-email');
const { loginEmail }= require('./login-email');

module.exports = {
    attachRoutes: function (router) {
      router.post('/auth/signupemail', signupEmail);
      router.post('/auth/loginEmail', loginEmail);
    }
}

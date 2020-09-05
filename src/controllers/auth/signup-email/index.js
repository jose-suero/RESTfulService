const { mapBodyMiddleware } = require('lib/model-mapper')
const { AppError } = require('../../../common');
const authService = require('../../../services/auth-service');

const { signupEmailInViewmodel } = require('./viewmodels/signup-email-in-viewmodel');

async function signupEmail(req, res, next) {
    const model = req.model;

    authService
        .signupEmail(model)
        .then(([user, identity]) => {
            res.status(200).json({
                ...user, ...identity
            });
        })
        .catch(err => next(err));

}

module.exports = {
    signupEmail: [
        mapBodyMiddleware(signupEmailInViewmodel), 
        signupEmail
    ]
}
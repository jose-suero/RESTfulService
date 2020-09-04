const { logger } = require('./common');

module.exports = {
    setupMiddlewares: function (app) {
        app.get('/', (req, res) => {
            res.status(200).json({ Hello: 'World' });
        });

        app.post('/auth/signupEmail', require('./controllers/auth').signupEmail);        
    }
}
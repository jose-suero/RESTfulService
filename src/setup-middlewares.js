const { errorMiddleware } = require('lib/model-mapper');
const { logger } = require('./common');

module.exports = {
    setupMiddlewares: function (app) {
        app.get('/', (req, res) => {
            res.status(200).json({ Hello: 'World' });
        });

        app.post('/auth/signupEmail', require('./controllers/auth').signupEmail);

        app.use(errorMiddleware((err, req, res, next) => {
            logger.child({ Http: true }).error(err);
            res.status(400).json({
                "error": err.message,
                "key": err.key,
                "specs": err.mapModelSpec
            });
        }));
    }
}
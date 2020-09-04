require('dotenv').config({});
const { setupHttpApp } = require('./setup-http-app');
const { setupDb } = require('./setup-db');
const { logger } = require('./common');
const { setupMiddlewares } = require('./setup-middlewares');
const { AppError } = require('./common');

function AppErrorMiddleware(err, req, res, next) {
    if (err instanceof AppError) {
        logger.error(err);
        return res.status(err.statusCode || 500).send({
            error: err.message,
            id: err.errorId,
            date: new Date()
        });
    }

    if (next) next(err);
    else throw err;
}

function catchOtherErrorMiddleware(err, req, res, next) {
    logger.error(err);
    return res.status(500).json({
        error: 'An unknown error has ocurred.'
    });
}

module.exports = {
    startApp: () => new Promise(async (resolve, reject) => {
        try {
            logger.info('Verifying connection to database.');
            await setupDb();

            logger.info('Setting up the http server.');
            const app = await setupHttpApp();

            logger.info('Setting middlewares up!');
            setupMiddlewares(app);

            app.use(AppErrorMiddleware, catchOtherErrorMiddleware);

            resolve(app);
        } catch (err) {
            logger.error(err);
            reject(err);
        }
    })
}

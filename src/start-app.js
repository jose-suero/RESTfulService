require('dotenv').config({});
const { setupHttpApp } = require('./setup-http-app');
const { setupDb } = require('./setup-db');
const { logger } = require('./common');
const { setupMiddlewares } = require('./setup-middlewares');
const { AppError } = require('./common');

function AppErrorMiddleware(err, req, res, next) {
    if (err instanceof AppError) {
        logger.error(err);
        return res.status(500).send({
            Success: false,
            Error: 'An unknow application error has ocurred. The error has been logged.',
            Date: new Date()
        });
    }

    next();
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

            app.use(AppErrorMiddleware);

            resolve(app);
        } catch (err) {
            logger.error(err);
            reject(err);
        }
    })
}

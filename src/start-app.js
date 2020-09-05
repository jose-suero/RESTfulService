require('dotenv').config({});
const { logger } = require('./common');
const { setupHttpApp } = require('./setup-http-app');
const { setupDb } = require('./setup-db');
const { setupMiddlewares } = require('./setup-middlewares');
const { errorLogger, requestLogger } = require('./common/express-logger');
const {
  appErrorMiddleware,
  unknownErrorMiddleware,
  modelMapErrorMiddleWare } = require('./middlewares');

module.exports = {
  startApp: () => new Promise(async (resolve, reject) => {
    try {
      logger.info('Verifying connection to database.');
      await setupDb();

      logger.info('Setting up the http server.');
      const app = await setupHttpApp();
      app.use(requestLogger);

      logger.info('Setting middlewares up!');
      setupMiddlewares(app);

      app.use(
        errorLogger,
        modelMapErrorMiddleWare,
        appErrorMiddleware,
        unknownErrorMiddleware
      );

      resolve(app);
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  })
}

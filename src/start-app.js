require('dotenv').config({});
const { errorMiddleware } = require('lib/model-mapper');
const { setupHttpApp } = require('./setup-http-app');
const { setupDb } = require('./setup-db');
const { logger } = require('./common');
const { setupMiddlewares } = require('./setup-middlewares');
const { AppError } = require('./common');
const { errorLogger, requestLogger } = require('./common/express-logger');

function AppErrorMiddleware(err, req, res, next) {
  if (err instanceof AppError) {
    logger.child({ AppError: true })
      .debug(err);
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

const modelMapErrorMiddleWare = errorMiddleware((err, req, res, next) => {
  logger.child({ ModdelMapping: true })
    .debug(err);

  res.status(400).json({
    "error": err.message,
    "key": err.key,
    "specs": err.mapModelSpec
  });
})

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
        AppErrorMiddleware,
        catchOtherErrorMiddleware
      );

      resolve(app);
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  })
}

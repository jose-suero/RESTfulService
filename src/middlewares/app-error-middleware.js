const { AppError, logger } = require('../common');

exports.appErrorMiddleware = function (err, req, res, next) {
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
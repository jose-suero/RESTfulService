const { errorMiddleware } = require('lib/model-mapper');
const { logger } = require('../common');

exports.modelMapErrorMiddleWare = errorMiddleware((err, req, res, next) => {
  logger.child({ ModdelMapping: true })
    .debug(err);

  res.status(400).json({
    "error": err.message,
    "key": err.key,
    "specs": err.mapModelSpec
  });
})
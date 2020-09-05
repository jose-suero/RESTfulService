const { logger } = require('../common/logger');

exports.unknownErrorMiddleware = function (err, req, res, next) {
  logger.error(err);
  return res.status(500).json({
    error: 'An unknown error has ocurred.'
  });
}
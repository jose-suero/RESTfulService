const { errorMiddleware } = require('@josesjs/model-mapper');
const { logger } = require('../common');

exports.modelMapErrorMiddleWare = errorMiddleware((err, req, res, next) => {
  logger.child({ ModdelMapping: true })
    .debug(err);

  const errors = err.getErrors();

  res.status(400).json({
    message: 'Please check the errors.',
    errors
  });
});
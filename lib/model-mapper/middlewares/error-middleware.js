const { ModelMapperError } = require('../classes/model-mapper-error');

exports.errorMiddleware = (mapError) => async function (err, req, res, next) {
  if (err && err instanceof ModelMapperError) {
      if (mapError) {
          try {
              await Promise.resolve(mapError(err, req, res, next));
          } catch (err) {
              next(err);
          }
      } else {
          return res.status(400).json({
              error: err.message,
              key: err.key,
              specs: err.mapModelSpec
          });
      }
  }

  next(err);
}
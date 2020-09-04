const { map } = require('../functions/map');

exports.mapResponseMiddleware = function (sourceObject, model, statusCode = 200) {
  return async (req, res, next) => {
    try {
      res.status(statusCode)
        .json(await map(sourceObject, model));
    } catch (err) {
      next(err);
    }
  }
};
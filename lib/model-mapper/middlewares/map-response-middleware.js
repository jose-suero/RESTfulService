const { map } = require('../functions/map');

exports.mapResponseMiddleware = function (model, statusCode = 200) {
  return async (req, res, next) => {
    try {
      res.status(statusCode)
        .json(await map(res.model, model));
    } catch (err) {
      next(err);
    }
  }
};
const { map } = require('../functions/map');

exports.mapBodyMiddleware = function mapBodyMiddleware(model) {
  return async (req, res, next) => {
    try {
      req.model = await map(req.body, model);
      next();
    } catch (err) {
      next(err);
    }
  }
};
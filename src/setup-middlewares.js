const controllers = require('./controllers');
const { loadAuthentication } = require('./middlewares/load-authentication');

module.exports = {
  setupMiddlewares: function (app) {
    app.use(loadAuthentication);

    app.get('/', (req, res) => {
      res.status(200).json({ Hello: 'World' });
    });

    for (controller in controllers) {
      controllers[controller].attachRoutes(app);
    }
  }
}
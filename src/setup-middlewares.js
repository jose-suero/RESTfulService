const controllers = require('./controllers');

module.exports = {
    setupMiddlewares: function (app) {
        app.get('/', (req, res) => {
            res.status(200).json({ Hello: 'World' });
        });

        for (controller in controllers) {
          controllers[controller].attachRoutes(app);
        }
    }
}
const { startApp } = require('./src/start-app');
const { logger } = require('./src/common');

(async function start() {
    try {
        await startApp();
        logger.info('The application has been started!');
    } catch (err) {
        logger.error('An error ocurred trying to start the application.', err);
    }
})();
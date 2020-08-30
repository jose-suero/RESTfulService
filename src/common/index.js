const AppError = require('./app-error');
const logger = require('./logger');

module.exports = {
    ...AppError,
    ...logger
}

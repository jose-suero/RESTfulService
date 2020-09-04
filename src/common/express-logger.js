const expressWinston = require('express-winston');
const winston = require('winston');
const { format } = winston;

exports.requestLogger = expressWinston.logger({
  level: 'info',
  format: format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.json(),
    format.timestamp()
  ),
  transports: [
    new winston.transports.File({ filename: './logs/http.log' }),
  ]
});

exports.errorLogger = expressWinston.errorLogger({
  level: 'info',
  format: format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.json(),
    format.timestamp()
  ),
  transports: [
    new winston.transports.File({ filename: './logs/http-errors.log' })
  ]
})
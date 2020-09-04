const winston = require('winston');
const { format } = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.errors({ stack: true }),
        format.metadata(),
        format.json(),
        format.timestamp()
    ),
    transports: [
        new winston.transports.File({ filename: './logs/errors.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' }),
    ]
});

if ((process.env.NODE_ENV || 'development') !== 'production') {
    logger.add(new winston.transports.Console({
        format: format.combine(
            format.timestamp(),
            format.colorize({ all: true }),
            format.simple()
        )
    }));
}

module.exports = { logger };

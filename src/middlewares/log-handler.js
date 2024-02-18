const winston = require('winston');
require('winston-daily-rotate-file');
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    winston.format.prettyPrint(),
    winston.format.colorize('red'),
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: './log/error.log', level: 'error', maxSize: '3k', maxFiles: '2',
    }),
    new winston.transports.DailyRotateFile({
      filename: './log/info.log', level: 'info', maxSize: '3k', maxFiles: '2',
    }),
  ],
});

const logHandler = (req, res) => {
  const level = req.error ? 'error' : 'info';
  logger.log(level, {
    statusCode: res.statusCode,
    request: {
      header: req.headers,
      body: req.body,
    },
    response: {
      header: res.getHeaders(),
      body: req.response,
    },
    error_message: req.errorobj ? req.errorobj.message : undefined,
    error_stack: req.errorobj ? req.errorobj.stack : undefined,
  });
};

module.exports = logHandler;

const winston = require("winston");

const { format } = winston;

const level = process.env.LOG_LEVEL || "debug";

const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [new winston.transports.Console({ level })],
});

module.exports = logger;

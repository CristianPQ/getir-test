const mongoose = require("mongoose");
const config = require("../config");
const logger = require("../../../lib/utils/logger");

mongoose.Promise = global.Promise;

logger.info(`---> config.database.uri ${config.database.uri}`);
mongoose
  .connect(config.database.uri, { useNewUrlParser: true })
  .then((db) => {
    logger.info(`Database state: ${db.connections[0].readyState}`);
  })
  .catch((error) => {
    logger.error(`Error while connecting to databse ${error}`);
  });

require("./domain");

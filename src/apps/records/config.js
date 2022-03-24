const MONGODB_URI = process.env.MONGODB_URI;

const config = {
  database: {
    uri: MONGODB_URI,
  },
};
module.exports = config;

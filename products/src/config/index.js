const dotEnv = require("dotenv");

// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
// }
dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL:
    "mongodb://" +
    process.env.MONGO_USER +
    ":" +
    process.env.MONGO_PASSWORD +
    "@" +
    process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
};

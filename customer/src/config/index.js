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
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "MS_SHOPPING_APP",
  QUEUE_NAME: "CUSTOMER_QUEUE",
  SHOPPING_BINDING_KEY: "SHOPPING_SERVICE",
  CUSTOMER_BINDING_KEY: "CUSTOMER_SERVICE",
  RABBITMQ_SETTINGS: {
    protocol: "amqp",
    hostname: process.env.RABBITMQ_HOSTNAME || "localhost",
    port: process.env.RABBITMQ_PORT || 5672,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    vhost: "/",
    authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
  },
};

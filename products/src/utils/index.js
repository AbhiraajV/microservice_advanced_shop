const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const {
  APP_SECRET,
  CUSTOMER_BINDING_KEY,
  EXCHANGE_NAME,
  MESSAGE_BROKER_URL,
  SHOPPING_BINDING_KEY,
  RABBITMQ_SETTINGS,
  QUEUE_NAME,
} = require("../config");
const amqp = require("amqplib");
//Utility functions
(module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
}),
  (module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
  });

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

(module.exports.GenerateSignature = async (payload) => {
  return await jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
}),
  (module.exports.ValidateSignature = async (req) => {
    const signature = req.get("Authorization");

    console.log(signature);

    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
      req.user = payload;
      return true;
    }

    return false;
  });

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

// ####### MESSAGE BROKER ##########

module.exports.CreateChannel = async () => {
  try {
    // create a connection to rbmq client
    const rbq_client = await amqp.connect(RABBITMQ_SETTINGS);
    console.log("RabbitMQ Client Connected");
    // create a channel over which msgs are send
    const channel = await rbq_client.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    console.log("Channel Established");
    return channel;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
// create a queue which holds these msgs to be sent

// subscriber & publisher
module.exports.PublishMessages = async (channel, binding_key, messages) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(messages));
    console.log("Message sent ", messages);
  } catch (error) {
    throw error;
  }
};

module.exports.SubscribeToMessages = async (channel, service, binding_key) => {
  try {
    const appQueue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
    channel.consume(appQueue.queue, (data) => {
      console.log("Received Data");
      console.log(data.content.toString());
      channel.ack(data);
    });
  } catch (error) {
    throw error;
  }
};

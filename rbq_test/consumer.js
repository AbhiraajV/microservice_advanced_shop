const amqp = require("amqplib");

const rabbitmqSettings = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "Abhiraaj",
  password: "12345678",
  vhost: "/",
  authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
};

const connect = async () => {
  const queue = "employees";

  try {
    const rbq_client = await amqp.connect(rabbitmqSettings);
    console.log("Connection Created!!");

    const channel = await rbq_client.createChannel();
    console.log("Channel has been created!!");

    const res = await channel.assertQueue(queue);
    console.log("Queue Created!!");

    console.log("Awaiting for msgs");
    channel.consume(queue, (message) => {
      let employee = JSON.parse(message.content.toString());
      console.log("Received: ", employee);

      channel.ack(message);
      //   if (employee.prof == "Devops") {
      //     console.log("Deleted a message");
      //   }
    });
  } catch (error) {
    console.error({ error });
  }
};
connect();

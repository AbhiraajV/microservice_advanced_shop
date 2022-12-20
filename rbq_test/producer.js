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

  const msgs = [
    {
      name: "Abhiraaj",
      prof: "SDE",
    },
    {
      name: "Someone",
      prof: "SDE",
    },
    {
      name: "Random",
      prof: "Devops",
    },
    {
      name: "Another",
      prof: "UI/UX",
    },
  ];

  try {
    const rbq_client = await amqp.connect(rabbitmqSettings);
    console.log("Connection Created!!");

    const channel = await rbq_client.createChannel();
    console.log("Channel has been created!!");

    const res = await channel.assertQueue(queue);
    console.log("Queue Created!!");

    for (let msg in msgs) {
      await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
      console.log("Message Sent");
    }
  } catch (error) {
    console.error({ error });
  }
};
connect();

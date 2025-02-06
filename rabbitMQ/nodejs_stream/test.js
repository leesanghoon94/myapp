const rabbit = require("rabbitmq-stream-js-client");

const streamName = "sex";

async function connectRabbitMQ() {
  console.log("Connecting...");

  const client = await rabbit.connect({
    hostname: "localhost",
    port: 5552,
    username: "guest",
    password: "guest",
    vhost: "/",
  });

  console.log("Making sure the stream exists...");

  const streamSizeRetention = 5 * 1e9;
  await client.createStream({
    stream: streamName,
    arguments: { "max-length-bytes": streamSizeRetention },
  });

  const publisher = await client.declarePublisher({ stream: streamName });

  console.log("Sending a message...");
  await publisher.send(Buffer.from("sex message"));
}

connectRabbitMQ(); // 비동기 함수를 호출하여 실행

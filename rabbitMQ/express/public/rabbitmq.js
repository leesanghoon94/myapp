const amqp = require("amqplib");

const rabbitmqUser = "guest";
const rabbitmqPassword = "guest";
const MQ_URL = "amqp://localhost";

 class RabbitMQ {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    this.connection = await amqp.connect(MQ_URL);
    this.channel = await this.connection.createChannel();
  }

  isOpen() {
    return (
      this.channel &&
      this.channel.connection &&
      this.channel.connection.stream.writable
    );
  }

  async order(orderData) {
    const queue = "orders";
    await this.connect()
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(orderData)), {
      persistent: true,
    });
  } catch(error){
    console.error(error);
   }
}

module.exports = RabbitMQ;



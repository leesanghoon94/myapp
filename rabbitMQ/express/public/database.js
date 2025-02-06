const fs = require("fs")
const amqp = require("amqplib")
const MQ_URL = "amqp://localhost";

async function store() {

    try {
        const connection = await amqp.connect(MQ_URL);
        const channel = await connection.createChannel();
        const queue = "orders"
        await channel.assertQueue(queue, {durable: true});

        channel.consume(queue, (msg)=> {
            if (msg !== null) {
                const message = msg.content.toString();
                try {
                    const filePath ="./database.json";
                    fs.writeFileSync(filePath, message);
                    console.log('complete to store database')
                } catch (e) {
                    console.log('failed to write database');
                    console.error(e);

                }

                channel.ack(msg);
            }
        })

    } catch (e) {
        console.log("failed to write database", e);
    }
}

module.exports = store
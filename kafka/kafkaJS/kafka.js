const { Kafka } = require('kafkajs');  // 여기에서 Kafka를 가져오고

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']  // broker 주소 수정
});

const admin = kafka.admin();
async function fetchMetadata() {
    await admin.connect();
    const metadata = await admin.fetchTopicMetadata({topics: []})
    console.log(metadata)
    await admin.disconnect();
}

// fetchMetadata().catch(error => console.log(error));


///------------------------//

const producer = kafka.producer();

async function send(){
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [{ value: 'Hello World! kafka!!' }],
    });

    await producer.disconnect();

}

send().catch(error => console.log(error));


const consumer = kafka.consumer({ groupId: 'my-group' });

async function consume(){
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    // await consumer.run({
    //     eachMessage: async ({ topic, partition, message }) => {
    //         console.log({
    //             value: message.value.toString(),
    //         })
    //     }
    // })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message: ${message.value.toString()}`);
        }
    });



}

consume().catch(error => console.log(error))
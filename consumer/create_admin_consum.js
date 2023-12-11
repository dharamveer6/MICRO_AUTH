const kafka = require('kafka-node');
const knex = require('../db');
const Consumer = kafka.Consumer;

const client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092' }); // Replace with your Kafka broker(s)

const topics = [{ topic: 'create_admin3' }]; // Replace 'my-topic' with your topic name

const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'utf8',
};

let create_admin_consumer;

function subscribeToTopic() {
  create_admin_consumer = new Consumer(client, topics, options);

  create_admin_consumer.on('message', async (message) => {
    try {
      console.log("consume call");
      const ins = await knex("master_admins").insert(JSON.parse(message.value));
    } catch (err) {
      console.log(err);
    }
  });

  create_admin_consumer.on('error', function (err) {
    console.error(`Consumer error: ${err}`);
    // Continue trying to subscribe to the topic
    setTimeout(subscribeToTopic, 5000); // Retry after 5 seconds
  });
}

subscribeToTopic();

module.exports = { create_admin_consumer };

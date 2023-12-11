const kafka = require('kafka-node');
const Producer = kafka.Producer;


// Specify the Kafka broker(s) with their ports
const client = new kafka.KafkaClient({ kafkaHost:'127.0.0.1:9092' }); // Example port: 9092

const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Producer is ready');
    // Now it's safe to start producing messages
  });




producer.on('error', (err) => {
    // Handle errors
    console.error('Producer error:', err);
});

module.exports={producer}



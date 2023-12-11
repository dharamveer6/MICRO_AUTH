const kafka = require('kafka-node');
const knex = require('../db');
const Consumer = kafka.Consumer;

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); // Replace with your Kafka broker(s)

const topics = [{ topic: 'create_admin'}]; // Replace 'my-topic' with your topic name

const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'utf8',
};

const consumer = new Consumer(client, topics, options);

consumer.on('message', async(message) =>{

    try{
        console.log("consume call")
          const ins=await knex("master_admins").insert(JSON.parse(message.value))
    }
    catch(err){
console.log(err)
    }
 
  
});

consumer.on('error', function (err) {
  console.error(`Consumer error: ${err}`);
});

consumer.on('offsetOutOfRange', function (err) {
  console.error(`Offset out of range: ${err}`);
});


module.exports={consumer}
// Handle other events and errors as needed

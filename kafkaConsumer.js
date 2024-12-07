const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(client, [{ topic: 'payments', partition: 0 }], {
  autoCommit: true, // commit offset every 5 seconds
  groupId: 'inventory-group', // consumer group id
});
module.exports = consumer;

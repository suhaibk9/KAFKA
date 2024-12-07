const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);
let payment;
producer.on('ready', function () {
    console.log("Producer is ready");
  payment = JSON.stringify({
    orderId: 'order-123',
    status: 'SUCCESS',
    amount: 1000,
  });
  const payloads = [{ topic: 'payments', messages: payment, partition: 0 }];
  producer.send(payloads, function (err, data) {
    if (err) console.error(err);
    else console.log("data", data);
  });
});
producer.on('error', function (err) {
  console.error(err);
});
module.exports = producer;

//Client
// const kafka = require('kafka-node');
// const Consumer = kafka.Consumer;
// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// const consumer = new Consumer(client, [{ topic: 'payments', partition: 0 }], {
//   autoCommit: true, // commit offset every 5 seconds
//   groupId: 'inventory-group', // consumer group id
// });
// module.exports = consumer;

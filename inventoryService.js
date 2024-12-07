const kafka = require('kafka-node');
const consumer = require('./kafkaConsumer');

const inventory = {
  'item-1': 10,
  'item-2': 20,
  'item-3': 300,
  'item-4': 40,
};
const updateInventory = (PaymentEvent) => {
  const quantityToReduce = 1;
  console.log('PaymentEvent', PaymentEvent);
  if (inventory[PaymentEvent.itemId] && PaymentEvent.status === 'SUCCESS') {
    inventory[PaymentEvent.itemId] -= quantityToReduce;
    console.log('Inventory updated', inventory);
  } else if (
    inventory[PaymentEvent.itemId] &&
    PaymentEvent.status !== 'SUCCESS'
  ) {
    console.log('Payment failed');
  }
};

consumer.on('message', function (message) {
  try {
    const PaymentEvent = JSON.parse(message.value);
    console.log('message', message);
    console.log('PaymentEvent', PaymentEvent);
    updateInventory(PaymentEvent);
  } catch (e) {
    console.error(e);
  }
});

consumer.on('error', function (err) {
  console.error(err);
});

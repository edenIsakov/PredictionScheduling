const amqp = require('amqplib');
const { queueuUrl } = require('config');

let globalchanel;
const createChannel = async function () {
  if (!globalchanel) {
    const connetion = await amqp.connect(queueuUrl);
    globalchanel = await connetion.createChannel();
  }
}
const addToQueue = async function (queueName, data) {
  if (globalchanel) {
    await globalchanel.assertQueue(queueName);
    await globalchanel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  } else {
    throw new Error('Connection to queue not found');
  }
}

module.exports = {
  createChannel,
  addToQueue,
}
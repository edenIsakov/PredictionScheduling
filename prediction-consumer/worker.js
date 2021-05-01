const amqp = require('amqplib/callback_api');
const { queueName, queueUrl, failQueueName } = require('config');
const { threadId } = require('worker_threads');
const { createConnection, insertPrediction } = require('./databaseManager');

function predicte(task) {
  return Math.floor(Math.random() * 10);
}



amqp.connect(queueUrl, async function (error0, connection) {
  if (error0) {
    throw error0;
  }
  const dbConnection = await createConnection();
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    channel.assertQueue(queueName, {
      durable: true
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

    channel.consume(queueName, async function (msg) {
      console.log(" [x] %s Received %s", threadId, msg.content.toString());
      const task = JSON.parse(msg.content.toString());
      const prediction = predicte(task);
      try {
        const result = await insertPrediction(dbConnection, task, prediction);
        console.log(`Worker ${threadId} work on task ${task.reqId}`);
      } catch (error) {
        console.error(`Failed to insert task to db, ${task.reqId}`);

        // Zero Retries
        channel.assertQueue(failQueueName, {
          durable: true
        });
        channel.sendToQueue(failQueueName, Buffer.from(JSON.stringify({ ...task, error }), {
          persistent: true
        }));
      }
    }, {
      noAck: true
    });
  });
});
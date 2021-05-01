const GUID = require('guid');
const { addTaskToQueue } = require('../services/prediction');


startPrediction = async function (req, res, next) {
  const { customerId, model, datapath } = req.body;
  const reqId = GUID.create();
  const task = {
    reqId,
    customerId,
    model,
    datapath
  };
  try {
    const result = await addTaskToQueue(task);
    res.status(200).send({ message: 'Task entered to the queque', reqDetails: task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while trying add task' })
  };
}

module.exports = { startPrediction }
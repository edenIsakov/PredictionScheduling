const { addToQueue } = require('../utils/queueManagment');

addTaskToQueue = async function (task) {
  await addToQueue('Tasks', task);
}

module.exports = { addTaskToQueue }
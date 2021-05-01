const express = require('express');
const { port } = require('config');
const prediction = require('./routes/prediction');
const bodyparser = require('body-parser');
const { createChannel } = require('./utils/queueManagment');


const app = express();
app.use(bodyparser.json());
createChannel();
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

app.use('/predictions', prediction);
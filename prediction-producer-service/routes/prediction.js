const express = require('express');
const router = express.Router();
const { startPrediction } = require('../controllers/prediction');

router.post('/', startPrediction);

module.exports = router;

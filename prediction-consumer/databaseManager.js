const mysql = require('mysql2');
const bluebird = require('bluebird');
const { db } = require('config');

const createConnection = async function () {
  const connectio = await mysql.createConnection({ ...db, Promise: bluebird });
  connectio.connect();
  return connectio;
}

const insertPrediction = async function (connection, { reqId, customerId, datapath }, prediction) {
  return await connection.execute('INSERT INTO `predictions`(reqId, customerId, datapath, prediction) VALUES(?, ?, ?, ?)', [reqId, customerId, datapath, prediction]);
}

module.exports = {
  createConnection,
  insertPrediction,
}
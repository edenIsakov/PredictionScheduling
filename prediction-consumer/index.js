const { Worker } = require('worker_threads');
const workerScriptFilePath = require.resolve('./worker.js');
const worker1 = new Worker(workerScriptFilePath);
const worker2 = new Worker(workerScriptFilePath);
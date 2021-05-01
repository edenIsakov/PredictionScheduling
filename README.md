# On Demand Predictions Scheduling

 This project was developed with node.js, react.js, RabbitMQ, and MySQL.
 Pleace install [RabbitMQ](https://www.rabbitmq.com/download.html), [MySQL](https://dev.mysql.com/downloads/installer/), [node.js](https://nodejs.org/en/download/)

## Services
In this repo there are three services:
- prediction-producer-client: Creates requests for on-demand predictions and sends them to the
Prediction Producer Servicer, the communication between them is REST API.
- prediction-producer-service:  A service that gets on-demand prediction requests from the
prediction client and puts them in the queue.
- prediction-consumer: A multi-threaded process that reads from the queue, calls the
model prediction code, and writes the result to the Database along with the request details.

## Installation
After Installing MySQL, RabbitMQ, and node.js you can run the code.
- prediction-producer-service
Install the dependencies and devDependencies and start the server.
```sh
cd prediction-producer-service
npm i
npm start
```

- prediction-producer-client
Install the dependencies and devDependencies and start the server.
```sh
cd prediction-producer-client
npm i
npm start

```
- prediction-consumer
Install the dependencies and devDependencies and start the server.
```sh
cd prediction-consumer
npm i
npm start
```

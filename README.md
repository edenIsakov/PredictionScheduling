# On Demand Predictions Scheduling

 This project was developt with node.js, react.js, rabbitmq and mysql.
 Pleace install [rabbitmq](https://www.rabbitmq.com/download.html), [mysql](https://dev.mysql.com/downloads/installer/), [nodejs](https://nodejs.org/en/download/)

## Services
In this repo there is three services:
- prediction-producer-client: Creates requests for a on demand predictions and sends them to the
Prediction Producer Servicer, the communication between them is REST API.
- prediction-producer-service:  A service which gets on demand predictions requests from the
prediction client and puts them in the queue.
- prediction-consumer: A multi-threaded process which reads from the queue, calls the
model prediction code, and writes the result to the Database along with the request details.

## Installation
After Installing mysql, rabbitmq and nodejs you can run the code.
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

const { Kafka } = require('../../../elastic-worker/node_modules/kafkajs/types')

console.log("this is broker", process.env.KAFKA_BROKER);

let broker1 = process.env.KAFKA_BROKER || 'localhost:9092';

const kafka = new Kafka({
  clientId: 'kafka-trigger-strategy-client',
  brokers: [broker1]
})

module.exports = kafka
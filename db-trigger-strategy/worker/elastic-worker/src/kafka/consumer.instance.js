const kafka = require('./kafka.instance')
const kafkaConsumer = kafka.consumer({ groupId: 'employee-trigger-group' })
kafkaConsumer.connect();

module.exports = kafkaConsumer
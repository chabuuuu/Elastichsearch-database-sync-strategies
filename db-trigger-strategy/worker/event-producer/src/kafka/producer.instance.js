const kafka = require('./kafka.instance')
const kafkaProducer = kafka.producer()

module.exports = kafkaProducer
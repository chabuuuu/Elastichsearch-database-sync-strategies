const kafka = require('./kafka.instance')
const kafkaConsumer = kafka.consumer({ groupId: 'es-first-sync-group' })

module.exports = kafkaConsumer
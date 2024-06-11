const kafka = require('../kafka/kafka.instance')
const elasticService = require('../services/elastic.service')
async function newEmployeeInsertedTopic() {
  const kafkaConsumer = kafka.consumer({ groupId: 'employee-trigger-group' })
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: "new-employee-inserted", fromBeginning: true });

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      elasticService.insert(JSON.parse(message.value.toString()), 'employee');
    },
  });
}

module.exports = newEmployeeInsertedTopic;

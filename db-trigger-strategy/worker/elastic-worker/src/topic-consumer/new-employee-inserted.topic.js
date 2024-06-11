const kafka = require('../kafka/kafka.instance')
const elasticService = require('../services/elastic.service')
async function newEmployeeInsertedTopic() {
  const kafkaConsumer = kafka.consumer({ groupId: 'new-employee-inserted-group' })
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: "new-employee-inserted", fromBeginning: true });

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Message received from topic:', topic);
      const value = JSON.parse(message.value);
      const newEmployee = value.data;
      elasticService.insert(newEmployee, 'employee');
    },
  });
}

module.exports = newEmployeeInsertedTopic;

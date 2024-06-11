const kafka = require('../kafka/kafka.instance')
const elasticService = require('../services/elastic.service')

async function employeeUpdatedTopic() {
  const kafkaConsumer = kafka.consumer({ groupId: 'employee-updated-group' })
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: "employee-updated", fromBeginning: true });

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Message received from topic:', topic);
      const value = JSON.parse(message.value);
      const employeeId= value.id;
      const updateEmployee = value.data;
      elasticService.update({id: employeeId}, updateEmployee, 'employee');
    },
  });
}

module.exports = employeeUpdatedTopic;

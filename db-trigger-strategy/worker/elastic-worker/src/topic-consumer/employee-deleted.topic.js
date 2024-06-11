const kafka = require('../kafka/kafka.instance')
const elasticService = require('../services/elastic.service')

async function employeeDeletedTopic() {
  const kafkaConsumer = kafka.consumer({ groupId: 'employee-deleted-group' })
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: "employee-deleted", fromBeginning: true });

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log('Message received from topic:', topic);
        const value = JSON.parse(message.value);
        const employeeId= value.id;
        elasticService.delete({id: employeeId}, 'employee');
    },
  });
}

module.exports = employeeDeletedTopic;

const kafka = require('../kafka/kafka.instance')

async function employeeUpdatedTopic() {
  const kafkaConsumer = kafka.consumer({ groupId: 'employee-trigger-group' })
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: "employee-updated", fromBeginning: true });

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
}

module.exports = employeeUpdatedTopic;

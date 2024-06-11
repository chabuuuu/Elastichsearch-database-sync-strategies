const kafka = require("../kafka/kafka.instance");
const elasticService = require("../services/elastic.service");

async function allEmployeeDataTopic() {
  const kafkaConsumer = kafka.consumer({ groupId: "employee-sync-group" });
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: "allEmployeeData", fromBeginning: true });
  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const allEmployee = JSON.parse(message.value.toString());
      console.log("allEmployee:", allEmployee);

      //Sync all employee data to Elastic
      elasticService.sync(allEmployee, "employee");
    },
  });
}

module.exports = allEmployeeDataTopic;

const kafka = require("../kafka/kafka.instance");
const elasticService = require("../services/elastic.service");
async function newEmployeeInsertedTopic() {
  const kafkaConsumer = kafka.consumer({
    groupId: "new-employee-inserted-group",
    heartbeatInterval: 10000,
  });
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({
    topic: "new-employee-inserted",
    fromBeginning: true,
  });

  let count = 0;
  let newEmployeeList = [];
  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        count++;
        console.log("Message received from topic:", topic);
        console.log("Count each: ", count);
        const value = JSON.parse(message.value);
        const newEmployee = value.data;
        newEmployeeList.push(newEmployee);
        console.log("New employee data:", newEmployee);
        await elasticService.insert(newEmployee, "employee");
        console.log("New employee data inserted to Elastic");
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });
}

module.exports = newEmployeeInsertedTopic;

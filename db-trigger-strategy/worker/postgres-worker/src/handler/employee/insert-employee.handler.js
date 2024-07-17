const pool = require("../../pool/pool.init");
const kafkaProducer = require("../../kafka/producer.instance");

let insertEmployeeList = [];

async function sendToKafka(topic) {
  try {
    setInterval(async () => {
      await kafkaProducer.connect();
      insertEmployeeList.forEach((element) => {
        kafkaProducer.send({ topic, messages: [element] });
      });
      insertEmployeeList = [];
    }, 1000);
  } catch (error) {
    console.error("Failed to send message, retrying...", error);
  }
}

//Insert new employee data event handle
async function insertHandle() {
  const client = await pool.connect();

  console.log("Listening for employee create event");

  client.query("listen watch_create_event_table_employee");

  await kafkaProducer.connect();
  sendToKafka("new-employee-inserted");

  client.on("notification", async (data) => {
    const employeeData = data.payload || "";
    const formatEmployeeData = JSON.parse(employeeData);
    //console.log("Employee insert data:", formatEmployeeData);

    //Send message to kafka topic
    const msg = { data: formatEmployeeData };
    insertEmployeeList.push({ value: JSON.stringify(msg) });
    // kafkaProducer.send({
    //   topic: "new-employee-inserted",
    //   messages: [{ value: JSON.stringify(msg) }],
    // });
    //sendToKafka("new-employee-inserted", [{ value: JSON.stringify(msg) }]);
  });
}

module.exports = insertHandle;

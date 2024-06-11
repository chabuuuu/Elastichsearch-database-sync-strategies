const pool = require("../../pool/pool.init");
const kafkaProducer = require("../../kafka/producer.instance");

//Update employee data event handle
async function updateHandle() {
  const client = await pool.connect();

  console.log("Listening for employee update event");

  client.query("listen watch_update_event_table_employee");

  client.on("notification", async (data) => {
    const employeeData = data.payload || "";
    const formatEmployeeData = JSON.parse(employeeData);
    console.log("Employee update data:", formatEmployeeData);

    //Send message to kafka topic
    await kafkaProducer.connect();
    const msg = {
      id: formatEmployeeData.id,
      data: formatEmployeeData,
    };
    await kafkaProducer.send({
      topic: "employee-updated",
      messages: [
       { value: JSON.stringify(msg)}
      ],
    });
    console.log("Message sent successfully");
  });
}

module.exports = updateHandle;

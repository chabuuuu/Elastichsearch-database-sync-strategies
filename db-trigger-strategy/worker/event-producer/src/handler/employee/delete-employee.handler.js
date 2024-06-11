const pool = require('../../pool/pool.init')
const kafkaProducer = require('../../kafka/producer.instance')

//Delete employee data event handle
async function deleteHandle() {
  const client = await pool.connect();

  console.log("Listening for employee delete event");

  client.query("listen watch_delete_event_table_employee");

  client.on("notification", async (data) => {
    const employeeData = data.payload || "";
    const formatEmployeeData = JSON.parse(employeeData);
    console.log("Employee delete data:", formatEmployeeData);

    //Send message to kafka topic
    await kafkaProducer.connect()
    const msg =  { id: formatEmployeeData.id }
    await kafkaProducer.send({
      topic: 'employee-deleted',
      messages: [
        { value: JSON.stringify(msg)}
      ],
    })
    console.log("Message sent successfully");
  });
}

module.exports = deleteHandle;

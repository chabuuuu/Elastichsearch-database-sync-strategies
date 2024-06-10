const pool = require('../../pool/pool.init')
const kafkaProducer = require('../../kafka/producer.instance')

//Insert new employee data event handle
async function insertHandle() {
    const client = await pool.connect();
  
    console.log("Listening for employee create event");
  
    client.query("listen watch_create_event_table_employee");
  
    client.on("notification", async (data) => {
      const employeeData = data.payload || "";
      const formatEmployeeData = JSON.parse(employeeData);
      console.log("Employee insert data:", formatEmployeeData);

      await kafkaProducer.connect()
      await kafkaProducer.send({
        topic: 'test-topic',
        messages: [
          { value: 'Hello KafkaJS user!' },
        ],
      })
      console.log("Message sent successfully");
    });
}

module.exports = insertHandle;
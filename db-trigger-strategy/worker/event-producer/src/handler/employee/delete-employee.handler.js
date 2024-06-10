const pool = require('../../pool/pool.init')

//Delete employee data event handle
async function deleteHandle() {
  const client = await pool.connect();

  console.log("Listening for employee delete event");

  client.query("listen watch_delete_event_table_employee");

  client.on("notification", async (data) => {
    const employeeData = data.payload || "";
    const formatEmployeeData = JSON.parse(employeeData);
    console.log("Employee delete data:", formatEmployeeData);
  });
}

module.exports = deleteHandle;

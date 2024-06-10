const pool = require('../../pool/pool.init')

//Update employee data event handle
async function updateHandle() {
  const client = await pool.connect();

  console.log("Listening for employee update event");

  client.query("listen watch_update_event_table_employee");

  client.on("notification", async (data) => {
    const employeeData = data.payload || "";
    const formatEmployeeData = JSON.parse(employeeData);
    console.log("Employee update data:", formatEmployeeData);
  });
}

module.exports = updateHandle;

require("dotenv").config();
const insertHandle = require("./handler/employee/insert-employee.handler");
const deleteHandle = require("./handler/employee/delete-employee.handler");
const updateHandle = require("./handler/employee/update-employee.handler");
const esSynsHandler = require('./handler/es-sync/es-sync.handler');

insertHandle();
deleteHandle();
updateHandle();
esSynsHandler();
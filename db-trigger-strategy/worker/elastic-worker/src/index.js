require('dotenv').config()
const employeeUpdatedTopic = require('./topic-consumer/employee-updated.topic')
const kafkaProducer = require('./kafka/producer.instance')
const allEmployeeDataTopic = require('./topic-consumer/allEmployeeData.topic')
const newEmployeeInsertedTopic = require('./topic-consumer/new-employee-inserted.topic')
const employeeDeletedTopic = require('./topic-consumer/employee-deleted.topic')
//Init topic consumer
employeeUpdatedTopic();
newEmployeeInsertedTopic();
employeeDeletedTopic();
allEmployeeDataTopic();

//First sync between Elastic & Postgres when startup
async function firstSyncInit() {
    await kafkaProducer.connect()
    await kafkaProducer.send({
      topic: 'esFirstSync',
      messages: [
        { value: 'Sync init at: ' + Date.now().toString() },
      ],
    })
}
firstSyncInit()

const kafkaConsumer = require('../../kafka/consumer.instance')
const kafkaProducer = require('../../kafka/producer.instance')
const pool = require('../../pool/pool.init')

async function esSynsHandler (){
    await kafkaConsumer.connect()
    await kafkaConsumer.subscribe({ topic: 'esFirstSync', fromBeginning: true })
    await kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        console.log('Start sync all employee data to Elastic');
        const client = await pool.connect();
            client.query("SELECT * FROM EMPLOYEE").then(async (res) => {
                const allEmployee = res.rows
                console.log('allEmployee:', allEmployee);
                await kafkaProducer.connect()
                await kafkaProducer.send({
                  topic: 'allEmployeeData',
                  messages: [
                    { value: JSON.stringify(allEmployee) },
                  ],
                })
            }).catch((err) => {
                console.log(err)
            })
      },
    })
}

module.exports = esSynsHandler;
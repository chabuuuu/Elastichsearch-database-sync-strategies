const { Client } = require('@elastic/elasticsearch')
const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_URL,
})

module.exports = elasticClient
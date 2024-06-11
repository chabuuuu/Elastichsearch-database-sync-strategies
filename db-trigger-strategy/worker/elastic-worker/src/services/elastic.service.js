const elasticClient = require('../utils/elastic/elastic.instance')

class elasticService {
    async insert(data, index){
        console.log('Inserting data to elastic search', data)
        elasticClient.create({
            index: index,
            document: data
        })
    }

    async sync(data, index){
        console.log('Syncing data to elastic search', data)
        elasticClient.deleteByQuery({
            index: index,
            body: {
                query: {
                    match_all: {}
                }
            }
        })
        const bulkData = data.flatMap(doc => [{ index: { _index: index } }, doc])
        elasticClient.bulk({
            body: bulkData
        })
    }
}

module.exports = new elasticService()
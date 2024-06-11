const elasticClient = require('../utils/elastic/elastic.instance')

class elasticService {


    async update(query, data, index){
        console.log('Updating data to elastic search', data)
        this.delete(query, index);
        this.insert(data, index);
    }

    async delete(query, index){
        console.log('Deleting data from elastic search', query)
        elasticClient.deleteByQuery({
            index: index,
            body: {
                query: {
                    match_all: query
                }
            }
        })
    }

    async insert(data, index){
        console.log('Inserting data to elastic search', data)
        elasticClient.create({
            index: index,
            body: 
            {
              document: JSON.parse(data)
            }
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
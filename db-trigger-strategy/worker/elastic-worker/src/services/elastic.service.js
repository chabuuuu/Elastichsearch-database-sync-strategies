const elasticClient = require("../utils/elastic/elastic.instance");

class elasticService {
  async update(query, data, index) {
    console.log("Updating data to elastic search", data);
    this.delete(query, index);
    this.insert(data, index);
  }

  async delete(query, index) {
    console.log("Deleting data from elastic search", query);
    elasticClient.deleteByQuery({
      index: index,
      body: {
        query: {
          match: query,
        },
      },
    });
  }

  async bulkInsert(data) {
    elasticClient.bulk({
      body: data,
    });
  }

  async insert(data, index) {
    await elasticClient.bulk({
      body: [{ index: { _index: index } }, data],
    });
  }

  async sync(data, index) {
    console.log("Syncing data to elastic search", data);
    elasticClient.deleteByQuery({
      index: index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
    const bulkData = data.flatMap((doc) => [{ index: { _index: index } }, doc]);
    elasticClient.bulk({
      body: bulkData,
    });
  }
}

module.exports = new elasticService();

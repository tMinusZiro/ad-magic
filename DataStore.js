const { MongoClient, ObjectId } = require("mongodb");

class DataStore {
  constructor(dbUrl, database, collection) {
    this.url = dbUrl;
    this.dbName = database;
    this.collectionName = collection;
    this.isConnected = false;
  }

  async openConnect() {
    if (!this.isConnected) {
      const client = new MongoClient(this.url, { useUnifiedTopology: true });
      await client.connect();
      const dataBase = client.db(this.dbName);
      const collection = dataBase.collection(this.collectionName);
      this.isConnected = client;
      return collection;
    } else {
      const dataBase = this.isConnected.db(this.dbName);
      const collection = dataBase.collection(this.collectionName);
      return collection;
    }
  }

  async showAll() {
    const collection = await this.openConnect();
    //find all sales objects
    let cursor = await collection.find({});
    //add to results array
    let resultArr = [];
    await cursor.forEach((document) => {
      resultArr.push(document);
    });
    return resultArr;
  }

  async searchByKey(searchType, value) {
    const collection = await this.openConnect();
    let cursor = await collection.find({ [searchType]: value });
    let resultsArr = await cursor.forEach((document) => {
      resultsArr.push(document);
    });
    return resultsArr;
  }

  async addEntry(data) {
    const collection = await this.openConnect();
    await collection.insertOne(data);
    return data;
  }

  async deleteEntry(targetId) {
    const collection = await this.openConnect();
    await collection.deleteOne({ _id: ObjectId(targetId) });
  }

  async updateEntry(targetId, update) {
    const collection = await this.openConnect();
    await collection.updateOne({ _id: ObjectId(targetId) }, { $set: update });
  }

  async totalSales() {
    const collection = await this.openConnect();
    console.log("agg method");
    const result = await collection.aggregate([
      { $match: { Scrubbed__c: "true" } },
      {
        $group: {
          _id: "$Country__c",
          totalSales: { $sum: "$Total_Sales__c" },
        },
      },
    ]);
    // await result.forEach(console.dir);
    // console.log("cursor ", result);
    return result;
  }

  async closeConnect() {
    if (this.isConnected) {
      await this.isConnected.close();
    }
  }
}

module.exports = DataStore;

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

  async deleteEntry(targetId) {
    const collection = await this.openConnect();
    await collection.deleteOne({ _id: ObjectId(targetId) });
  }

  async updateEntry(targetId, update) {
    const collection = await this.openConnect();
    await collection.updateOne({ _id: ObjectId(targetId) }, { $set: update });
  }
//top dashboard data
  async totalSales() {
    const collection = await this.openConnect();
    const result = await collection.aggregate([
      { $match: { Scrubbed__c: "true" } },
      {
        $group: {
          _id: "$Scrubbed__c",
          totalSales: { $sum: "$Total_Sales__c" },
          averageSale: { $avg: "$Total_Sales__c" },
          totalItems: { $sum: "$QTY__c" },
        },
        //
      },
    ]);
    return result
  }
  //Vendors chart data
  async vendors(){
    const collection= await this.openConnect();
    const vendors = await collection.aggregate([
      {$match: { Scrubbed__c: "true"}},
      { $group: {
        _id: "$Sales_Type__c", 
        numberOfSales: { $sum: "$QTY__c"},
        totalSales: { $sum: "$Total_Sales__c" },
      }
      }
    ])
    return vendors;
  }
  async findClients() {
    const collection = await this.openConnect();
    const clientsResult = await collection.aggregate([
      { $match: { Scrubbed__c: "true" } },
      {
        $group: {
          _id: "$Account__c",
          totalSales: { $sum: "$Total_Sales__c" },
          itemList: { $addToSet: "$Item__c" },
        },
      },
    ]);
    console.log("clientsResult:", clientsResult)
    return clientsResult;
  }

  async findSalesByForm(formResults) {
    const collection = await this.openConnect();
    let newStart = new Date();
    let newEnd = new Date();
    //decide on start date based on pre-sets or user input
    if (formResults.startDate && formResults.endDate) {
      //if user inputted custom date, will show up on form as startDate
      newStart = formResults.startDate;
      newEnd = formResults.endDate;
    } 
    else 
    {
      let startYear = newStart.getFullYear();
      let startMonth = newStart.getMonth() + 1 
      let startDay = newStart.getDate();
      let endYear = newEnd.getFullYear()
      let endMonth = newEnd.getMonth() +1;
      let endDate = newEnd.getDate()
      // if client chooses last newYear subtract 1 from current newYear      
      if (formResults.datePreset === "year") {
        startYear= startYear- 1;
      }
      //if client chooses last 6 months, subtract 6 months from months
      else if (formResults.datePreset === "six-months") {
        newStart.setMonth(startMonth - 6)
        startMonth = newStart.getMonth()
        startYear = newStart.getFullYear()
      }
      //if client chooses last month, subtract 1 month from months
      else if (formResults.datePreset === "month") {
        newStart.setMonth(startMonth - 1);
        startMonth = newStart.getMonth();
        startYear = newStart.getFullYear()
      }
      //if client chooses last week, subtract 7 days from date
      else if (formResults.datePreset === "week") {
        newStart.setDate(startDay - 7);
        startDay = newStart.getDate();
        startMonth = newStart.getMonth();
        startYear = newStart.getFullYear();
      }
      //client chooses quarter
      else if (formResults.datePreset === "quarter") {
        startDay= 1; 
        //if it's Jan, Feb, or March, set the quarter to be the last three months of the previous year
        if (startMonth === 0 || startMonth === 1 || startMonth === 2) {
          startYear = startYear - 1;
          startMonth = 10;
          endYear = startYear -1; 
          endMonth = 12;
          endDate = 31;
          //if it's April, May or June, set the quarter to be January - March of current year
        } else if (startMonth === 3 || startMonth === 4 || startMonth === 5) {
          startMonth = 1;
          endMonth = 3;
          endDate = 31;
          //if it's July, or August, or September set the quarter to be April - June of current year
        } else if (startMonth === 6 || startMonth === 7 || startMonth === 8) {
          startMonth = 4;
          endMonth = 6;
          endDate = 31;
          //if it's October, November, or December, set the quarter to be July - September of current year
        } else if (startMonth === 9 || startMonth === 10 || startMonth === 11) {
          startMonth = 7;
          endMonth = 9;
          endDate = 30;
        }
      } else if (formResults.datePreset === "all-time") {
        startDay = 1;
        startMonth = 1; 
        startYear = 2018
      }
        if (startDay < 10) {
          startDay = "0" + startDay 
        }
        if (startMonth < 10) {
          startMonth = "0"+ startMonth 
        }
        if (endDate < 10) {
          endDate = "0" + endDate 
        }
        if (endMonth < 10) {
          endMonth = "0"+ endMonth 
        }
        newEnd = `${endYear}-${endMonth}-${endDate}`;
        newStart = `${startYear}-${startMonth}-${startDay}`;
        console.log("at end of date function", newStart, newEnd)
      }
    
    //group results by state on country based on user input
    let filterBy;
    if (formResults.region === "United States") {
      filterBy = "$State_Provence__c";
    } else filterBy = "$Country__c";

    let account = formResults.account; 
    // let accountName;
    // if (formResults.account === "all") {
    //   accountName = `Scrubbed__c: "true"`;
    // } else accountName = `Account__c: ${formResults.account}`;
    console.log("form results in datastore", formResults);
    const salesResults = await collection.aggregate([
      {
        $match: {
          $expr: {
            $gte: [
              newEnd,
              {
                $dateToString: {
                  date: "$Transaction_date__c",
                  format: "%Y-%m-%d",
                },
              },
            ],
          },
        },
      },
      {
        $match: {
          $expr: {
            $lte: [
              newStart,
              {
                $dateToString: {
                  date: "$Transaction_date__c",
                  format: "%Y-%m-%d",
                },
              },
            ],
          },
        },
      },
      {
        $match: { Account__c: formResults.account },
      },
      {
        $match: { Item__c: formResults.item },
      },
      {
        $group: {
          _id: filterBy,
          account: { $addToSet: "$Account__c" },
          averagePrice: { $avg: "$Price__c" },
          totalSales: { $sum: "$Total_Sales__c" },
          division: { $addToSet: "$Division__c" },
          optInMarketing: { $push: "$opt_in__c" },
          postalCode: { $push: "$Postal_Code__c" },
          itemsSold: { $sum: "$QTY__c" },
          distinctSalesTypes: { $addToSet: "$Sales_Type__c" },
          salesType: { $push: "$Sales_Type__c" },
          distinctSources: { $addToSet: "$Source__c" },
          source: { $push: "$Source__c" },
          distinctVendors: { $addToSet: "$Vendor__c" },
          vendor: { $push: "$Vendor__c" },
          itemList: { $addToSet: "$Item__c" },
          date: { $addToSet: "$Transaction_date__c" },
        },
      },
    ]);
    //helperFunction(salesResults)
    return salesResults;
  }

  async closeConnect() {
    if (this.isConnected) {
      await this.isConnected.close();
    }
  }
}

module.exports = DataStore;

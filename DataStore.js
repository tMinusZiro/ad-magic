const { MongoClient, ObjectId } = require("mongodb");

class DataStore {
  constructor(dbUrl, database, collection) {
    this.url = dbUrl;
    this.dbName = database;
    this.collectionName = collection;
    this.isConnected = false;
  }

  //open the connection to the DB
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

  //top dashboard data
  async totalSales() {
    const collection = await this.openConnect();
    const result = await collection.aggregate([
      // { $match: { Scrubbed__c: "true" } },
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
    return result;
  }
  //filtered top dashboard data
  async filterTotalSales(client, item, formResults) {
    changeDate(formResults);

    const collection = await this.openConnect();
    //filter function
    if (client === "All Clients" && item === "All Items") {
      const result = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        {
          $group: {
            _id: "$Scrubbed__c",
            totalSales: { $sum: "$Total_Sales__c" },
            averageSale: { $avg: "$Total_Sales__c" },
            totalItems: { $sum: "$QTY__c" },
          },
        },
      ]);
      return result;
    }
    // filter by item
    else if (client === "All Clients" && item !== "All Items") {
      changeDate(formResults);
      console.log("new end :", newEnd);
      const result = await collection.aggregate([
        { $match: { Scrubbed__c: "true" } },
        { $match: { Item__c: item } },
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
          $group: {
            _id: "$Scrubbed__c",
            totalSales: { $sum: "$Total_Sales__c" },
            averageSale: { $avg: "$Total_Sales__c" },
            totalItems: { $sum: "$QTY__c" },
          },
        },
      ]);
      return result;
    }
    // filter by client
    else if (client !== "All Clients" && item === "All Items") {
      changeDate(formResults);
      const result = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        {
          $group: {
            _id: "$Account__c",
            totalSales: { $sum: "$Total_Sales__c" },
            averageSale: { $avg: "$Total_Sales__c" },
            totalItems: { $sum: "$QTY__c" },
          },
        },
      ]);

      return result;
    } else if (client !== "All Clients" && item !== "All Items") {
      const result = await collection.aggregate([
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        { $match: { Item__c: item } },
        {
          $group: {
            _id: "$Account__c",
            totalSales: { $sum: "$Total_Sales__c" },
            averageSale: { $avg: "$Total_Sales__c" },
            totalItems: { $sum: "$QTY__c" },
          },
        },
      ]);

      return result;
    }
  }
  //Sale Type chart data
  async salesTypes(client, item, formResults) {
    const collection = await this.openConnect();
    if (client === "All Clients" && item === "All Items") {
      changeDate(formResults);
      const types = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        {
          $group: {
            _id: "$Sales_Type__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return types;
    } else if (client !== "All Clients" && item === "All Items") {
      changeDate(formResults);
      const types = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        {
          $group: {
            _id: "$Sales_Type__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return types;
    } else if (client === "All Clients" && item !== "All Items") {
      changeDate(formResults);
      const types = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Item__c: item } },
        {
          $group: {
            _id: "$Sales_Type__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return types;
    } else if (client !== "All Clients" && item !== "All Items") {
      changeDate(formResults);
      const types = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        { $match: { Item__c: item } },
        {
          $group: {
            _id: "$Sales_Type__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return types;
    }
  }
  //Fullfilment chart data
  async fullfilmentType(client, item, formResults) {
    const collection = await this.openConnect();
    if (client === "All Clients" && item === "All Items") {
      changeDate(formResults);
      const fullfilment = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        {
          $group: {
            _id: "$Fulfillment_Type__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return fullfilment;
    } else if (client !== "All Clients" && item === "All Items") {
      changeDate(formResults);
      const fullfilment = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        {
          $group: {
            _id: "$Fulfillment_Type__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return fullfilment;
    } 
     else if (client === "All Clients" && item !== "All Items") {
      changeDate(formResults);
      const fullfilment = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Item__c: item } },
        {
          $group: {
            _id: "$Fulfillment_Type__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return fullfilment;
    } else if (client !== "All Clients" && item !== "All Items") {
      changeDate(formResults);
      const fullfilment = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        { $match: { Item__c: item } },
        {
          $group: {
            _id: "$Fulfillment_Type__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return fullfilment;
    }
  }
  //Marketing chart data
  async MarketingOpt(client, item, formResults) {
    const collection = await this.openConnect();
    if (client === "All Clients" && item === "All Items") {
      changeDate(formResults);
      const marketingOpt = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        {
          $group: {
            _id: "$opt_in__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return marketingOpt;
    } else if (client !== "All Clients" && item === "All Items") {
      changeDate(formResults);
      const marketingOpt = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        {
          $group: {
            _id: "$opt_in__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return marketingOpt;
    } else if (client === "All Clients" && item !== "All Items") {
      changeDate(formResults);
      const marketingOpt = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Item__c: item } },
        {
          $group: {
            _id: "$opt_in__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return marketingOpt;
    } else if (client !== "All Clients" && item !== "All Items") {
      changeDate(formResults);
      const marketingOpt = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        { $match: { Item__c: item } },
        {
          $group: {
            _id: "$opt_in__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return marketingOpt;
    }
  }
  //   //Vendors chart data
  async Vendors(client, item, formResults) {
    const collection = await this.openConnect();
    if (client === "All Clients" && item === "All Items") {
    console.log("in Vendors function");
    console.log("client: ", client);
    console.log("item: ", item);
      changeDate(formResults);
      const vendor = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        {
          $group: {
            _id: "$Vendor__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return vendor;
    } else if (client !== "All Clients" && item === "All Items") {
      changeDate(formResults);
      const vendor = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Account__c: client } },
        {
          $group: {
            _id: "$Vendor__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return vendor;
    } else if (client === "All Clients" && item !== "All Items") {
      changeDate(formResults);
      const vendor = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Item__c: item } },
        {
          $group: {
            _id: "$Vendor__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return vendor;
    } else if (client !== "All Clients" && item !== "All Items") {
      changeDate(formResults);
      const vendor = await collection.aggregate([
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
        { $match: { Scrubbed__c: "true" } },
        { $match: { Item__c: item } },
        { $match: { Account__c: client } },
        {
          $group: {
            _id: "$Vendor__c",
            numberOfSales: { $sum: "$QTY__c" },
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      return vendor;
    }
  }

  //populate sidebar with accounts and items
  async findClients() {
    const collection = await this.openConnect();
    const clientsResult = await collection.aggregate([
      // { $match: { Scrubbed__c: "true" } },
      {
        $group: {
          _id: "$Account__c",
          totalSales: { $sum: "$Total_Sales__c" },
          itemList: { $addToSet: "$Item__c" },
        },
      },
    ]);
    return clientsResult;
  }

  //return WORLD SALES sales on form results
  async findWorldSalesByForm(formResults) {
    const collection = await this.openConnect();
    //function to get new dates
    changeDate(formResults);

    let account = formResults.account;
    let item = formResults.item;
    let salesResults;
    //if all accounts are chosen, match the start & end date
    if (account === "All Clients" && item==="All Items") {
      salesResults = await collection.aggregate([
        {
          ///////////////////////
          //Match by date
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
        /////////////
        {
          $group: {
            _id: "$Country__c",
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      //if all accounts are chosen, match the start date, end date, & client
    } else if (account !== "All Clients" && item === "All Items") {
      salesResults = await collection.aggregate([
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
        { $match: { Account__c: formResults.account } },
        {
          $group: {
            _id: "$Country__c",
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
    } 
    else if (account === "All Clients" && item !== "All Items") {
      salesResults = await collection.aggregate([
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
        { $match: { Account__c: formResults.account } },
        {
          $group: {
            _id: "$Country__c",
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
    }
    
    else {
      //match the start date, end date, client, & item
      salesResults = await collection.aggregate([
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
            _id: "$Country__c",
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
    }
    return salesResults;
  }
  //same function as above, just match the country to US and group by state
  async findUSSalesByForm(formResults) {
    const collection = await this.openConnect();

    //decide on start date based on pre-sets or user input
    changeDate(formResults);
    let account = formResults.account;
    let item = formResults.item;
    let salesResults;
    //if all accounts are chosen, match the start & end date
    if (account === "All Clients") {
      salesResults = await collection.aggregate([
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
          $match: { Country__c: "United States" },
        },
        {
          $group: {
            _id: "$State_Provence__c",
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
      //if all accounts are chosen, match the start date, end date, & client
    } else if (item === "All Items") {
      salesResults = await collection.aggregate([
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
        { $match: { Account__c: formResults.account } },
        {
          $match: { Country__c: "United States" },
        },
        {
          $group: {
            _id: "$State_Provence__c",
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
    } else {
      //match the start date, end date, client, & item
      salesResults = await collection.aggregate([
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
          $match: { Country__c: "United States" },
        },
        {
          $group: {
            _id: "$State_Provence__c",
            totalSales: { $sum: "$Total_Sales__c" },
          },
        },
      ]);
    }
    return salesResults;
  }

  async findAllWorldSales() {
    const collection = await this.openConnect();

    const salesResults = await collection.aggregate([
      // { $match: { Scrubbed__c: "true" } },
      {
        $group: {
          _id: "$Country__c",
          totalSales: { $sum: "$Total_Sales__c" },
        },
      },
    ]);
    return salesResults;
  }
  async findAllUSSales() {
    const collection = await this.openConnect();
    let salesResults = [];
    salesResults = await collection.aggregate([
      {
        $match: { Country__c: "United States" },
      },
      {
        $group: {
          _id: "$State_Provence__c",
          totalSales: { $sum: "$Total_Sales__c" },
        },
      },
    ]);
    return salesResults;
  }

  async closeConnect() {
    if (this.isConnected) {
      await this.isConnected.close();
    }
  }
}

let newStart = new Date();
let newEnd = new Date();
function changeDate(formResults) {
  //decide on start date based on pre-sets or user input
  if (formResults.startDate && formResults.endDate) {
    //if user inputted custom date, will show up on form as startDate
    newStart = formResults.startDate;
    newEnd = formResults.endDate;
  } else {
    newStart = new Date();
    newEnd = new Date();
    let startYear = newStart.getFullYear();
    let startMonth = newStart.getMonth() + 1;
    let startDay = newStart.getDate();
    let endYear = newEnd.getFullYear();
    let endMonth = newEnd.getMonth() + 1;
    let endDate = newEnd.getDate();
    // if client chooses last newYear subtract 1 from current newYear
    if (formResults.datePreset === "Past Year") {
      startYear = startYear - 1;
    }
    //if client chooses last 6 months, subtract 6 months from months
    else if (formResults.datePreset === "Past Six Months") {
      newStart.setMonth(startMonth - 6);
      startMonth = newStart.getMonth();
      startYear = newStart.getFullYear();
    }
    //if client chooses last month, subtract 1 month from months
    else if (formResults.datePreset === "Past Month") {
      newStart.setMonth(startMonth - 1);
      startMonth = newStart.getMonth();
      startYear = newStart.getFullYear();
    }
    //if client chooses last week, subtract 7 days from date
    else if (formResults.datePreset === "Past Week") {
      newStart.setDate(startDay - 7);
      startDay = newStart.getDate();
      startMonth = newStart.getMonth() + 1;
      startYear = newStart.getFullYear();
    }
    //client chooses quarter
    else if (formResults.datePreset === "Last quarter") {
      startDay = 1;
      //if it's Jan, Feb, or March, set the quarter to be the last three months of the previous year
      if (startMonth === 0 || startMonth === 1 || startMonth === 2) {
        startYear = startYear - 1;
        startMonth = 10;
        endYear = startYear - 1;
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
    } else if (formResults.datePreset === "All time") {
      startDay = 1;
      startMonth = 1;
      startYear = 2018;
    }
    if (startDay < 10) {
      startDay = "0" + startDay;
    }
    if (startMonth < 10) {
      startMonth = "0" + startMonth;
    }
    if (endDate < 10) {
      endDate = "0" + endDate;
    }
    if (endMonth < 10) {
      endMonth = "0" + endMonth;
    }
    newEnd = `${endYear}-${endMonth}-${endDate}`;
    newStart = `${startYear}-${startMonth}-${startDay}`;
  }
  return newEnd, newStart;
}

module.exports = DataStore;

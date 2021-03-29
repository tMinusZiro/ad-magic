require("dotenv").config();
const mongoose = require("mongoose");
const adMagicPassword = process.env.ADMAGICPASS;

//specific db connection
mongoose.connect(
  `mongodb+srv://admagic:admagic12345@cluster0.9xf59.mongodb.net/adMagic?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// mongoose.connect("mongodb://username:password@host:port/database?options...", {
//   useNewUrlParser: true,
// });

//initialize variable that contains the connection to the collection db
const magicDB = mongoose.connection;

//ask Bob about this
magicDB.on("error", console.error.bind(console, "connection error:"));

magicDB.once("open", () => console.log("Connected to DB!"));

//set up schema => shape of the data
const magicSchema = new mongoose.Schema({
  Account__c: String,
  Amount__c: Number,
  City__c: String,
  Country__c: String,
  Division__c: String,
  Fulfillment_Type__c: String,
  Item__c: String,
  opt_in__c: Boolean,
  Postal_Code__c: String,
  Price__c: Number,
  QTY__c: Number,
  Sales_Type__c: String,
  Source__c: String,
  State_Provence__c: String,
  Total_Sales__c: Number,
  Transaction_date__c: Date,
  Vendor__c: String,
});

//first arg = collection in db, if collection doesnt exist mongo will make it, and second is the schema prototype
const MagicModel = mongoose.model("Sales", magicSchema);

module.exports = MagicModel;

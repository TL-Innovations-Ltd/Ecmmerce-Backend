const mongoose = require("mongoose");
const {envPath} = require("../config/env");

const connectDB = async () => {
  try {
    let connectionString;
    let  test_messgae;
    
    if (envPath === '.env.dev') {
      connectionString = process.env.MONGODB_URI;
      test_messgae = "MongoDB connected successfully! Development";
    } else {
      connectionString = process.env.MONGO_DB_LOCAL;
      test_messgae = "MongoDB connected successfully! Production";
    }

    await mongoose.connect(connectionString);
    console.log(test_messgae);
  } catch (error) {
    console.log(error)
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;

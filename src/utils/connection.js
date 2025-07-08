const mongoose = require("mongoose");
const {envPath} = require("../config/env");

const connectDB = async () => {
  try {
    let connectionString;
    
    if (envPath === '.env.dev') {
      connectionString = process.env.MONGODB_URI;
    } else {
      connectionString = process.env.MONGO_DB_LOCAL;
    }

    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log(error)
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;

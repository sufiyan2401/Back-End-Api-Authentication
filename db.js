const mongoose = require("mongoose");
require("dotenv").config();
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = connectToMongo;

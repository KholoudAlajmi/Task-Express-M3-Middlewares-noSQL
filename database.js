const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://kholoudoa2000:TPkdWHsP4Hq6NW8T@cluster0.vjoqf.mongodb.net/M3");
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;

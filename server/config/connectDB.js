const mongoose = require("mongoose")
const connectionString = process.env.MONGO_URI

const connectDB = async () => {
    console.log("Connecting database")
  mongoose
    .connect(connectionString)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports =  connectDB;

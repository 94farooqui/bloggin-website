//import modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const connectDB = require("./config/connectDB")

//import from project
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.LOCAL_MONGO_URI || process.env.CLOUD_MONGO_URI



// Middleware
app.use(bodyParser.json());

// // MongoDB Connection
mongoose.connect(mongoURI, {
  
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));
// connectDB()

//api routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Import routes




require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
// const seedProducts = require("./script/seedProducts"); 

const hairTestRoutes = require("./routes/hairTest");
const reportRoutes = require("./routes/report");
const orderRoutes = require("./routes/order");

const app = express();
app.use(express.json()); // For regular JSON requests
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

connectDB();
// seedProducts(); -- To Seed Products for recommendations

app.use("/api/hair-test", hairTestRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/order", orderRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server listening on ${process.env.PORT}`);
});

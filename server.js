const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");

const connectToMongo = require("./db");

require("dotenv").config();

const app = express();
connectToMongo();

app.use(express.json()); //Middleware
app.use(cors());

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(` backend listening at http://localhost:${process.env.PORT}`);
});

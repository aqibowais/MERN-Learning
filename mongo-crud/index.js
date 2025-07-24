const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user");
const { connectToMongo } = require("./connection");
const fs = require("fs");
const logReqRes = require("./middlewares/log");

const app = express();
const PORT = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGODBURL;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//custom middleware
app.use(logReqRes("log.txt"));

//connect to mongo
connectToMongo(mongodbUrl);

app.use("/users", userRoutes);

app.listen(PORT, (req, res) =>
  console.log(`Server is running on port : ${PORT}`)
);

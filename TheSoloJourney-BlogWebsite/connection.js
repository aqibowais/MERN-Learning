const mongoose = require("mongoose");

async function connectToMongo(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("mongodb connected"))
    .catch((e) => console.log(e));
}

module.exports = {connectToMongo}
const mongoose = require("mongoose");

async function connectToMongo(mongodbUrl) {
   return mongoose
  .connect(mongodbUrl)
  .then(() => console.log("mongodb connected"))
  .catch((e) => console.log(`Error is ${e}`));
}

module.exports = {
    connectToMongo
}
const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      "log.txt",
      `Request made at ${req.url} at ${new Date().toISOString()} from ${req.ip}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = logReqRes;

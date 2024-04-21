const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const dir = "../logs/" + logFileName;
  try {
    if (!fs.existsSync("../logs")) {
      await fsPromises.mkdir("../logs");
    }
    await fsPromises.appendFile(dir, logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  next();
};

module.exports = { logEvents, logger };

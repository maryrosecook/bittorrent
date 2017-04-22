const fs = require("fs");
const bencode = require("bencode");

module.exports = function trackerUrl(trackerFilePath) {
  return decodeTrackerFile(trackerFilePath).announce;
};

function decodeTrackerFile(trackerFilePath) {
  return bencode
    .decode(fs.readFileSync(trackerFilePath), "utf8");
};

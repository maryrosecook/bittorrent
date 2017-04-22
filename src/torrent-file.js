const fs = require("fs");
const bencode = require("bencode");

module.exports = function trackerUrl(torrentFilePath) {
  return decodeTorrentFile(torrentFilePath).announce;
};

function decodeTorrentFile(torrentFilePath) {
  return bencode
    .decode(fs.readFileSync(torrentFilePath), "utf8");
};

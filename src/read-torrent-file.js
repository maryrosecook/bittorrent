const fs = require("fs");
const bencode = require("bencode");

module.exports = function readTorrentFile(torrentFilePath) {
  let torrentDataBuffer = fs.readFileSync(torrentFilePath);
  return decodeTorrentFile(torrentDataBuffer);
};

function decodeTorrentFile(torrentDataBuffer) {
  return bencode.decode(torrentDataBuffer);
};

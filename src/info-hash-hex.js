const readTorrentFile = require("./read-torrent-file");
const bencode = require("bencode");
const crypto = require("crypto");

module.exports = function infoHashHex(torrentFilePath) {
  let torrentData = readTorrentFile(torrentFilePath);
  return crypto.createHash('sha1')
    .update(bencode.encode(torrentData.info))
    .digest("hex");
};

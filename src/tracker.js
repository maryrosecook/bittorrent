"use strict";

const fs = require("fs");
const bencode = require("bencode");

function requestUrl(torrentFilePath) {
  let torrentData = readTorrentDataFromDisk(torrentFilePath);
  return trackerUrl(torrentData);
};

function readTorrentDataFromDisk(torrentFilePath) {
  let torrentDataBuffer = fs.readFileSync(torrentFilePath);
  return decodeTorrentFile(torrentDataBuffer);
};

function decodeTorrentFile(torrentDataBuffer) {
  return bencode.decode(torrentDataBuffer, "utf8");
};

function trackerUrl(torrentData) {
  return torrentData.announce;
};

module.exports = {
  requestUrl
};

"use strict";

const fs = require("fs");
const bencode = require("bencode");
const querystring = require("querystring");
const url = require("url");
const crypto = require("crypto");
const _ = require("underscore");
const randomstring = require("randomstring").generate;

function requestUrl(torrentFilePath) {
  let torrentData = readTorrentDataFromDisk(torrentFilePath);
  return constructRequestUrl(announceUrl(torrentData),
                             infoHash(torrentData),
                             peerId(),
                             leftToDownload(torrentData));
};

function peerId() {
  return "MC" + randomstring(18);
};

function constructRequestUrl(announceUrl, infoHash, peerId, left) {
  let urlObj = url.parse(announceUrl);
  urlObj.query = {
    info_hash: infoHash,
    peer_id: peerId,
    left: left
  };

  return url.format(urlObj);
};

function infoHash(torrentData) {
  return crypto.createHash('sha1')
    .update(bencode.encode(torrentData.info))
    .digest("hex");
};

function readTorrentDataFromDisk(torrentFilePath) {
  let torrentDataBuffer = fs.readFileSync(torrentFilePath);
  return decodeTorrentFile(torrentDataBuffer);
};

function decodeTorrentFile(torrentDataBuffer) {
  return bencode.decode(torrentDataBuffer, "utf8");
};

function leftToDownload(torrentData) {
  return torrentData.info.length;
};

function announceUrl(torrentData) {
  return torrentData.announce;
};

module.exports = {
  requestUrl
};

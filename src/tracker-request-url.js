"use strict";

const fs = require("fs");
const bencode = require("bencode");
const querystring = require("querystring");
const url = require("url");
const _ = require("underscore");
const readTorrentFile = require("./read-torrent-file");
const infoHashHex = require("./info-hash-hex");
const peerId = require("./peer-id");

module.exports = function trackerRequestUrl(torrentFilePath) {
  let torrentData = readTorrentFile(torrentFilePath);
  return constructRequestUrl(announceUrl(torrentData),
                             infoHashHex(torrentFilePath),
                             peerId(),
                             leftToDownload(torrentData));
};

// Not happy with this.  A SHA1 is 40 chars or 20 hex bytes.  The
// tracker expects it as 20 hex bytes, so we can't just send the 40
// chars.  querystring.stringify expects UTF8.  Unfortunately, if we
// use digest("utf8"), some of the SHA1 bytes seem to be invalid UTF8
// chars. They seem to get munged which means when they are
// percent-encode, the original bytes are partially lost and the
// info_hash isn't sending the same bytes of the original hash.  Our
// solution is to URL encode the info_hash bytes by hand in
// percentEncodeHex and bold them onto the URL by hand.  Not ideal.
// Possible alternative implementation for percentEncodeHex:
// `return escape(hexBuffer.toString("latin1"));`. This relies on the
// fact that the legacy JS `escape` isn't sensitive to utf8.
function constructRequestUrl(announceUrl, infoHashHex, peerId, left) {
  let urlObj = url.parse(announceUrl);
  let escapedInfoHash = percentEncodeHex(infoHashHex);
  let paramsExceptInfoHash = querystring.stringify({
    peer_id: peerId,
    left: left
  });

  urlObj.search = `${paramsExceptInfoHash}&info_hash=${escapedInfoHash}`
  return url.format(urlObj);
};

function percentEncodeHex(hexString) {
  return "%" + hexString.match(/.{1,2}/g).join("%");
};

function leftToDownload(torrentData) {
  return torrentData.info.length;
};

function announceUrl(torrentData) {
  return torrentData.announce.toString();
};

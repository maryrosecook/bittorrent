const trackerRequestUrl = require("./tracker-request-url");
const requestPeers = require("./request-peers");
const parsePeerAddresses = require("./parse-peer-addresses");

module.exports = async function downloadTorrent(torrentPath) {
  return await
    parsePeerAddresses(
      await requestPeers(
        trackerRequestUrl(torrentPath)));
};

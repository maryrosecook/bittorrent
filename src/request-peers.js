"use strict";

const request = require('request-promise');

module.exports = async function requestPeers(trackerRequestUrl) {
  return await request({
    uri: trackerRequestUrl,
    encoding: null // keep as binary so bencode can decode
  });
};

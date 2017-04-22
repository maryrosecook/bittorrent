"use strict";

const path = require("path");
const tracker = require("../src/tracker");

describe("#trackerRequestUrl", function() {
  it("info_hash param set to SHA1 of info dictionary", function() {
    let torrentPath = path.resolve(
      __dirname,
      "../data/flagfromserver.torrent");

    expect(tracker.requestUrl(torrentPath))
      .toEqual("http://thomasballinger.com:6969/announce");
  });
});

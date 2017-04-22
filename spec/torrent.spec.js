"use strict";

const trackerUrl = require("../src/torrent-file");
const path = require("path");

describe("torrent parsing", function() {
  it("extracts the tracker location from the torrent", function() {
    let torrentPath = path.resolve(
      __dirname,
      "../data/flagfromserver.torrent");

    expect(trackerUrl(torrentPath))
      .toEqual("http://thomasballinger.com:6969/announce");
  });
});

"use strict";

let sinon = require("sinon");
let proxyquire = require("proxyquire");

const path = require("path");
const tracker = require("../src/tracker");

describe("#requestUrl", function() {
  let torrentPath;
  beforeEach(function() {
    torrentPath = path.resolve(
      __dirname,
      "../data/flagfromserver.torrent");
  });

  it("is URL of tracker in torrent", function() {
    expect(tracker.requestUrl(torrentPath))
      .toMatch("^http:\/\/thomasballinger\.com:6969\/announce");
  });

  it("has info_hash param set to SHA1 of torrent info dict", function() {
    expect(tracker.requestUrl(torrentPath))
      .toMatch("\\?info_hash=6ad206a0d37d416f24d5113ba468507344da427e");
  });

  it("has peer_id that includes MC", function() {
    let tracker = proxyquire("../src/tracker", {
      "randomstring": { generate: sinon.stub().returns("RANDOMID") }
    });

    expect(tracker.requestUrl(torrentPath))
      .toMatch("\\&peer_id=MCRANDOMID");
  });

  it("has length set to total length of file", function() {
    expect(tracker.requestUrl(torrentPath))
      .toMatch("\\&left=1277987");
  });
});

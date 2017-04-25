"use strict";

let sinon = require("sinon");
let proxyquire = require("proxyquire");

const path = require("path");
const trackerRequestUrl = require("../src/tracker-request-url");

describe("tracker", function() {
  describe("#trackerRequestUrl", function() {
    let torrentPath;
    beforeEach(function() {
      torrentPath = path.resolve(
        __dirname,
        "../data/flagfromserver.torrent");
    });

    it("is URL of tracker in torrent", function() {
      expect(trackerRequestUrl(torrentPath))
        .toMatch("^http:\/\/thomasballinger\.com:6969\/announce");
    });

    it("has info_hash param set to SHA1 of torrent info dict", function() {
      expect(trackerRequestUrl(torrentPath))
        .toMatch("\\&info_hash=%2b%15%ca%2b%fd%48%cd%d7%6d%39%ec%55%a3%ab%1b%8a%57%18%0a%09");
    });

    it("has peer_id that includes MC", function() {
      let trackerRequestUrl = proxyquire("../src/tracker-request-url", {
        "randomstring": { generate: sinon.stub().returns("RANDOMID") }
      });

      expect(trackerRequestUrl(torrentPath))
        .toMatch("\\?peer_id=MCRANDOMID");
    });

    it("has length set to total length of file", function() {
      expect(trackerRequestUrl(torrentPath))
        .toMatch("\\&left=1277987");
    });
  });
});

"use strict";

const sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon
const proxyquire = require("proxyquire");
const bencode = require("bencode");
const path = require("path");

describe("#requestPeers", function() {
  let trackerRequestUrl = "http://thomasballinger.com:6969/announce?peer_id=MCK2Nb1F5yRDdXJIVPLI&left=1277987&info_hash=%2b%15%ca%2b%fd%48%cd%d7%6d%39%ec%55%a3%ab%1b%8a%57%18%0a%09";

  it("returns a list of peers", function(done) {
    let requestPromise = sinon.stub().resolves("the response");
    let requestPeers = proxyquire("../src/request-peers", {
      "request-promise": requestPromise
    });

    requestPeers(trackerRequestUrl)
      .then((peerResponse) => {
        expect(peerResponse).toEqual("the response");
        expect(requestPromise.firstCall.args[0]).toEqual({
          uri: trackerRequestUrl,
          encoding: null
        });

        done();
      })
  });
});

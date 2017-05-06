const path = require("path");
const parser = require("../src/parser");
const generator = require("../src/generator");
const infoHashHex = require("../src/info-hash-hex");

describe("parser and generator", function() {
  let peerAddress = "96.126.104.219:54974";
  let torrentPath = path.resolve(
    __dirname,
    "../data/flagfromserver.torrent");

  it("creates parseable handshake", function() {
    let peerId = "MCjsdxwd9HR2qXDZcAl7";
    let handshake =
        generator.handshake(infoHashHex(torrentPath),
                            peerId)
        .toString("hex");

    let parsedHandshake = parser.handshake(handshake);

    expect(parsedHandshake.protocolLength)
      .toEqual(19);
    expect(parsedHandshake.protocolString)
      .toEqual("BitTorrent protocol");
    expect(parsedHandshake.reservedBytes)
      .toEqual("0000000000000000");
    expect(parsedHandshake.infoHash)
      .toEqual("2b15ca2bfd48cdd76d39ec55a3ab1b8a57180a09");
    expect(parsedHandshake.peerId)
      .toEqual(peerId);
  });
});

function handshake(infoHashHex, peerId) {
  let protocolString = "BitTorrent protocol";
  let protocolStringHex = Buffer.from(protocolString, "utf8")
      .toString("hex");
  let protocolStringLengthHex = protocolString.length.toString(16);
  let reservedBytesHex = "00".repeat(8);
  var handshakeHex =
      [protocolStringLengthHex,
       protocolStringHex,
       reservedBytesHex,
       infoHashHex,
       utf8ToHex(peerId)].join("");
  return Buffer.from(handshakeHex, "hex");
};

function utf8ToHex(utf8String) {
  return Buffer.from(utf8String).toString("hex");
};

module.exports = {
  handshake
};

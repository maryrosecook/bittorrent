const bencode = require("bencode");
const chunkArray = require("./chunk-array");

module.exports = function parsePeerAddresses(response) {
  const ADDRESS_BYTE_COUNT = 6;
  return chunkArray(peerBytes(response), ADDRESS_BYTE_COUNT)
    .map(parsePeerAddress);
};

function peerBytes(response) {
  return bencode.decode(response).peers;
};

function parsePeerAddress(bytes) {
  return `${ip(bytes.slice(0, 4))}:${port(bytes.slice(4, 6))}`;
};

function ip([byte0, byte1, byte2, byte3]) {
  return `${byte0}.${byte1}.${byte2}.${byte3}`;
};

function port([byte4, byte5]) {
  let buffer = Buffer.alloc(2);
  buffer.writeUInt8(byte4, 0);
  buffer.writeUInt8(byte5, 1);
  return buffer.readUIntBE(0, 2);
};

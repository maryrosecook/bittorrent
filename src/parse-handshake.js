const fs = require("fs");
const ohm = require("ohm-js");
const path = require("path");

let grammar = readGrammar();

function readGrammar() {
  let grammarFilePath = path.resolve(__dirname, "./handshake.ohm");
  return ohm.grammar(fs.readFileSync(grammarFilePath));
};

let semantics = grammar.createSemantics().addOperation("raw", {
  Start: (protocolLength,
          protocolString,
          reservedBytes,
          infoHash,
          peerId) => {
    return {
      protocolLength: protocolLength.raw(),
      protocolString: protocolString.raw(),
      reservedBytes: reservedBytes.raw(),
      infoHash: infoHash.raw(),
      peerId: peerId.raw()
    };
  },

  protocolLength: parseHexToInt,
  protocolString: hexToUtf8,
  reservedBytes: sourceString,
  infoHash: sourceString,
  peerId: hexToUtf8,

  h: (char1, char2) => {
    return char1 + char2;
  }
});

function sourceString(data) {
  return data.sourceString;
};

function hexToUtf8(data) {
  return Buffer.from(data.sourceString, "hex").toString();
};

function parseHexToInt(data) {
  return parseInt(data.sourceString, 16);
};

module.exports = function parse(input) {
  let match = grammar.match(input);
  if (match.failed()) {
    throw new Error("Couldn't match input");
  }

  return semantics(match).raw();
};

const parsePeerAddresses = require("../src/parse-peer-addresses");

describe("#parsePeerAddresses", function() {
  let peersRequestResponse = new Buffer("64383a636f6d706c65746569316531303a646f776e6c6f6164656469366531303a696e636f6d706c657465693165383a696e74657276616c69313839376531323a6d696e20696e74657276616c6939343865353a706565727331323ab935e3460000607e68dbd6be65", "hex");

  it("has peer_id that includes MC", function() {
    let peerAddresses = parsePeerAddresses(peersRequestResponse);
    expect(peerAddresses[0]).toEqual("185.53.227.70:0");
    expect(peerAddresses[1]).toEqual("96.126.104.219:54974");
  });
});

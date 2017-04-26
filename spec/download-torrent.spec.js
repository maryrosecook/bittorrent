const path = require("path");

const downloadTorrent = require("../src/download-torrent");

describe("whole torrent download", function() {
  let torrentPath;
  beforeEach(function() {
    torrentPath = path.resolve(
      __dirname,
      "../data/flagfromserver.torrent");
  });

  xit("downloads the flag torrent", async function(done) {
    expect(await downloadTorrent(torrentPath)).toBeDefined();
    done();
  });
});

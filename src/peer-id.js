const randomstring = require("randomstring").generate;

module.exports = function peerId() {
  return `MC${randomstring(18)}`;
};

/* eslint-disable no-undef */
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

if (typeof SVGPathElement !== "undefined") {
  SVGPathElement.prototype.getTotalLength = () => 0;
  SVGPathElement.prototype.getPointAtLength = () => ({ x: 0, y: 0 });
}

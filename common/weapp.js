import {
  require_lodash
} from "./chunks/chunk-KKIPYUKB.js";
import {
  __toModule
} from "./chunks/chunk-WGBKWIX4.js";

// fronts/weapp.js
var import_lodash = __toModule(require_lodash());
var nanoid = (size = 21) => {
  let id = '';
  const bytes = new Uint8Array(size);
  global.crypto.getRandomValues(bytes);

  // A compact alternative for `for (var i = 0; i < step; i++)`.
  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    // eslint-disable-next-line no-bitwise
    const byte = bytes[size] & 63;
    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36);
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }
  return id;
};
var lodash = import_lodash.default;
var nid = nanoid;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function rid(...args) {
  let v = nid(...args);
  if (isNumeric(v[0]) || v[0] === "-" || v[0] === "_") {
    v = rid(...args);
  }
  return v.replace(/-/g, "_");
}
export {
  isNumeric,
  lodash,
  nid,
  rid
};

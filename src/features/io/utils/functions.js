const toBitArray = (n, b = 8) => [...Array(b)].map((x, i) => (n >> i) & 1);

const fromBitArray = (array) => {
  return (
    0 |
    (array[0] << 7) |
    (array[1] << 6) |
    (array[2] << 5) |
    (array[3] << 4) |
    (array[4] << 3) |
    (array[5] << 2) |
    (array[6] << 1) |
    (array[7] << 0)
  );
};

const getBits = (byte, indexStart, indexEnd = 7) =>
  parseInt(
    toBitArray(byte)
      .slice(indexStart, indexEnd + 1)
      .reverse()
      .join(''),
    2
  );

function buildByte(...args) {
  // we take an objects, with the value, and the bits it takes up.
  let byte = 0;
  for (const element of arguments) {
    byte = byte | (element.value << element.start);
  }
  return byte;
}

const signedNumber = (byte) => (byte > 63 ? (byte ^ 64) - 64 : byte);

console.assert(1 === signedNumber(1));
console.assert(-1 === signedNumber(127));

// first argument must be type from file, and the rest the possible types in correct order (midi implementation)
function returnFromList(...args) {
  for (var i = 1; i < arguments.length; i++) {
    if (i - 1 === arguments[0]) {
      return arguments[i];
    }
  }
}

function returnValue(setting, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === setting) return i;
  }
}

export {
  toBitArray,
  fromBitArray,
  getBits,
  buildByte,
  signedNumber,
  returnFromList,
  returnValue,
};

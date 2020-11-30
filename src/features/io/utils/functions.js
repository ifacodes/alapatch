const toBitArray = (n, b = 8) => [...Array(b)].map((x, i) => (n >> i) & 1);

const getBits = (byte, indexStart, indexEnd = 7) =>
  parseInt(
    toBitArray(byte)
      .slice(indexStart, indexEnd + 1)
      .reverse()
      .join(''),
    2
  );

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

export { toBitArray, getBits, signedNumber, returnFromList, returnValue };

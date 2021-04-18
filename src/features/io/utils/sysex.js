//  Copyright 2021 Aoife Bradley
//
//  Author: Aoife Bradley (aoife@spinlock.icu)
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
//  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE
//  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* 

  SYSEX Midi Functions for the microKORG
  As per the microKORG midi specification found here: http://i.korg.com/uploads/Support/MK1_633652915168960000.pdf

  How does this work?

  The data handled by the microKORG is in 'sets' with each 'set' composed of 7 Bytes with 8 Bits as such:

  0b0000 0000
  0b1111 1111
  0bnnnn nnnn
  0b6666 6666

  this gets turned into 'sets' of 8 bytes with 7 Bits:

  0b0654 3210 -- this stores the MSB of the following 7 Bytes
  0b0000 0000
  0b0111 1111
  0b0nnn nnnn
  0b0666 6666

  In addition, the data is stored with an extra 2 Bytes, which gets converted into 3 bytes in the SYSEX format. 

  Handily, they displayed this as:
  CURRENT PROGRAM DATA (IN CURRENT BUFFER) DUMP FORMAT
  254bytes    = 7*36+2    -> 8*36+(1+2)   => 291Bytes

  It probably has something to do with dumping multiple programs as well as global settings, but I'm not handling those here.

*/

const SYSEX_LENGTH = 36 * 8 + (1 + 2);
const DATA_LENGTH = 36 * 7 + 2;

export function sysex_encode(data) {
  let sysex = new Uint8Array(SYSEX_LENGTH);
  let data_index = 0,
    syx_index = 0;
  while (data_index < DATA_LENGTH) {
    if (data_index + 7 <= DATA_LENGTH) {
      sysex[syx_index] =
        ((data[data_index] & 0x80) >> 7) |
        ((data[data_index + 1] & 0x80) >> 6) |
        ((data[data_index + 2] & 0x80) >> 5) |
        ((data[data_index + 3] & 0x80) >> 4) |
        ((data[data_index + 4] & 0x80) >> 3) |
        ((data[data_index + 5] & 0x80) >> 2) |
        ((data[data_index + 6] & 0x80) >> 1);

      sysex[syx_index + 1] = data[data_index] & 0x7f;
      sysex[syx_index + 2] = data[data_index + 1] & 0x7f;
      sysex[syx_index + 3] = data[data_index + 2] & 0x7f;
      sysex[syx_index + 4] = data[data_index + 3] & 0x7f;
      sysex[syx_index + 5] = data[data_index + 4] & 0x7f;
      sysex[syx_index + 6] = data[data_index + 5] & 0x7f;
      sysex[syx_index + 7] = data[data_index + 6] & 0x7f;
    }
    data_index += 7;
    syx_index += 8;
  }
  return sysex;
}

export function sysex_write_header(data, channel) {
  const ch = 0x30 + channel;
  const array = new Uint8Array(5 + SYSEX_LENGTH + 1);
  array.set([0xf0, 0x42, ch, 0x58, 0x40], 0);
  array.set([...data, 0xf7], 5);
  return array;
}

export function sysex_decode(syx) {
  const trimmed_data = syx.slice(5, -4);
  let data = new Uint8Array(DATA_LENGTH);
  let syx_index = 0,
    data_index = 0;
  while (syx_index < trimmed_data.length) {
    data[data_index] =
      ((trimmed_data[syx_index] & 0x1) << 7) | trimmed_data[syx_index + 1];
    data[data_index + 1] =
      ((trimmed_data[syx_index] & 0x2) << 6) | trimmed_data[syx_index + 2];
    data[data_index + 2] =
      ((trimmed_data[syx_index] & 0x4) << 5) | trimmed_data[syx_index + 3];
    data[data_index + 3] =
      ((trimmed_data[syx_index] & 0x8) << 4) | trimmed_data[syx_index + 4];
    data[data_index + 4] =
      ((trimmed_data[syx_index] & 0x10) << 3) | trimmed_data[syx_index + 5];
    data[data_index + 5] =
      ((trimmed_data[syx_index] & 0x20) << 2) | trimmed_data[syx_index + 6];
    data[data_index + 6] =
      ((trimmed_data[syx_index] & 0x40) << 1) | trimmed_data[syx_index + 7];
    data_index += 7;
    syx_index += 8;
  }
  return data;
}

export function sysex_check(sysex) {
  if (sysex.length !== 297) {
    throw new Error('incorrect file length');
  }
  if (sysex[0] !== 0xf0) {
    throw new Error('first byte is not SYSEX byte');
  }
  if (sysex[1] !== 0x42) {
    throw new Error('manufacturer code is not KORG');
  }
  if (sysex[4] !== 0x40) {
    throw new Error('not a program dump');
  }
  if (sysex[sysex.length - 1] !== 0xf7) {
    throw new Error('last byte is does not end SYSEX message');
  }
}

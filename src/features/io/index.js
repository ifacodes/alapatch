import { sysex_decode, sysex_check } from './utils/sysex';
import parse from './convert/parse';
import serialise from './convert/serialise';
import build_store from './convert/loadStore';
import saveStoreState from './convert/saveStore';

function return_store_from_file(file) {
  sysex_check(file);
  const parsed = parse(sysex_decode(file));
  return build_store(...parsed);
}

function return_file_from_store(state) {
  const simple_state = saveStoreState(state);
  console.log(serialise(simple_state));
}

export { return_store_from_file, return_file_from_store };

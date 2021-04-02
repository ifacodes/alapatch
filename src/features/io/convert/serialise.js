import { fromBitArray, buildByte } from '../utils/functions';

export default function serialise(patch) {
  serialise_patch(patch[0]);
}

function serialise_patch(patch) {
  const patch_array = Array.from(Buffer.from(patch.program_name, 'ascii'));
  patch_array.push(
    0,
    0,
    patch.arp_trigger_length,
    fromBitArray(patch.arp_trigger_pattern),
    buildByte({ value: patch.voice_mode, start: 4 }),
    buildByte(
      { value: patch.scale_key, start: 4 },
      { value: patch.scale_type, start: 0 }
    ),
    0,
    buildByte(
      { value: patch.delay_sync, start: 7 },
      { value: patch.delay_timebase, start: 0 }
    ),
    patch.delay_time,
    patch.delay_depth,
    patch.delay_type,
    patch.mod_lfo_speed,
    patch.mod_depth,
    patch.mod_type,
    patch.eq_hi_freq,
    patch.eq_hi_gain,
    patch.eq_low_freq,
    patch.eq_low_gain,
    (patch.arp_tempo >> 8) & 0xff,
    patch.arp_tempo & 0xff,
    buildByte(
      { value: patch.arp_switch, start: 7 },
      { value: patch.arp_latch, start: 6 },
      { value: patch.arp_target, start: 4 },
      { value: patch.arp_key_sync, start: 0 }
    ),
    buildByte(
      { value: patch.arp_type, start: 0 },
      { value: patch.arp_range, start: 4 }
    ),
    patch.arp_gate_time,
    patch.arp_resolution,
    patch.arp_swing,
    patch.keyboard_octave
  );
  console.log(patch_array);
}

function serialise_timbre(timbre) {}

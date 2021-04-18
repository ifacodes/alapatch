import { fromBitArray, buildByte } from '../utils/functions';

export default function serialise(patch) {
  const data = Array.from(serialise_patch(patch[0]));
  switch (patch[0].voice_mode) {
    default:
    case 'Single':
      data.concat(serialise_timbre(1, patch[1]));
      break;
    case 'Multiple':
      data.concat(serialise_timbre(1, patch[1]), serialise_timbre(2, patch[2]));
      break;
    case 'Vocoder':
      data.concat(serialise_vocoder(patch[1]));
      break;
  }
  return data;
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
  return patch_array;
}

function serialise_timbre(num, timbre) {
  const array = [
    timbre[`t${num}_midi_channel`],
    buildByte(
      { value: timbre[`t${num}_assign_mode`], start: 6 },
      { value: timbre[`t${num}_eg_2_reset`], start: 5 },
      { value: timbre[`t${num}_eg_1_reset`], start: 4 },
      { value: timbre[`t${num}_trigger_mode`], start: 3 },
      { value: timbre[`t${num}_key_priority`], start: 0 }
    ),
    timbre[`t${num}_unison_detune`],
    timbre[`t${num}_tune`],
    timbre[`t${num}_bend_range`],
    timbre[`t${num}_transpose`],
    timbre[`t${num}_vibrato_int`],
    timbre[`t${num}_osc_1_wave`],
    timbre[`t${num}_osc_1_ctrl_1`],
    timbre[`t${num}_osc_1_ctrl_2`],
    timbre[`t${num}_osc_1_dgws`],
    0,
    buildByte(
      { value: timbre[`t${num}_osc_2_mod_select`], start: 4 },
      { value: timbre[`t${num}_osc_2_wave`], start: 0 }
    ),
    timbre[`t${num}_osc_2_semitone`],
    timbre[`t${num}_osc_2_tune`],
    timbre[`t${num}_portamento`],
    timbre[`t${num}_osc_1_level`],
    timbre[`t${num}_osc_2_level`],
    timbre[`t${num}_noise_level`],
    timbre[`t${num}_filter_type`],
    timbre[`t${num}_filter_cutoff`],
    timbre[`t${num}_filter_resonance`],
    timbre[`t${num}_filter_eg_intensity`],
    timbre[`t${num}_filter_vel_sense`],
    timbre[`t${num}_filter_key_track`],
    timbre[`t${num}_amp_level`],
    timbre[`t${num}_amp_panpot`],
    buildByte(
      { value: timbre[`t${num}_amp_switch`], start: 6 },
      { value: timbre[`t${num}_amp_distortion`], start: 0 }
    ),
    timbre[`t${num}_amp_vel_sense`],
    timbre[`t${num}_amp_key_track`],
    timbre[`t${num}_eg_1_attack`],
    timbre[`t${num}_eg_1_decay`],
    timbre[`t${num}_eg_1_sustain`],
    timbre[`t${num}_eg_1_release`],
    timbre[`t${num}_eg_2_attack`],
    timbre[`t${num}_eg_2_decay`],
    timbre[`t${num}_eg_2_sustain`],
    timbre[`t${num}_eg_2_release`],
    buildByte(
      { value: timbre[`t${num}_lfo_1_key_sync`], start: 4 },
      { value: timbre[`t${num}_lfo_1_wave`], start: 0 }
    ),
    timbre[`t${num}_lfo_1_frequency`],
    buildByte(
      { value: timbre[`t${num}_lfo_1_tempo_sync`], start: 7 },
      { value: timbre[`t${num}_lfo_1_sync_note`], start: 0 }
    ),
    buildByte(
      { value: timbre[`t${num}_lfo_2_key_sync`], start: 4 },
      { value: timbre[`t${num}_lfo_2_wave`], start: 0 }
    ),
    timbre[`t${num}_lfo_2_frequency`],
    buildByte(
      { value: timbre[`t${num}_lfo_2_tempo_sync`], start: 7 },
      { value: timbre[`t${num}_lfo_2_sync_note`], start: 0 }
    ),
    buildByte(
      { value: timbre[`t${num}_patch_1_dest`], start: 4 },
      { value: timbre[`t${num}_patch_1_src`], start: 0 }
    ),
    timbre[`t${num}_patch_1_intensity`],
    buildByte(
      { value: timbre[`t${num}_patch_2_dest`], start: 4 },
      { value: timbre[`t${num}_patch_2_src`], start: 0 }
    ),
    timbre[`t${num}_patch_2_intensity`],
    buildByte(
      { value: timbre[`t${num}_patch_3_dest`], start: 4 },
      { value: timbre[`t${num}_patch_3_src`], start: 0 }
    ),
    timbre[`t${num}_patch_3_intensity`],
    buildByte(
      { value: timbre[`t${num}_patch_4_dest`], start: 4 },
      { value: timbre[`t${num}_patch_4_src`], start: 0 }
    ),
    timbre[`t${num}_patch_4_intensity`],
  ];
  array.concat(Array(55).fill(0));
  return array;
}

function serialise_vocoder(vocoder) {
  const array = [
    vocoder.v_midi_channel,
    buildByte(
      { value: vocoder.v_assign_mode, start: 6 },
      { value: vocoder.v_eg_2_reset, start: 5 },
      { value: vocoder.v_eg_1_reset, start: 4 },
      { value: vocoder.v_trigger_mode, start: 3 },
      { value: vocoder.v_key_priority, start: 0 }
    ),
    vocoder.v_unison_detune,
    vocoder.v_tune,
    vocoder.v_bend_range,
    vocoder.v_transpose,
    vocoder.v_vibrato_int,
    vocoder.v_osc_wave,
    vocoder.v_osc_ctrl_1,
    vocoder.v_osc_ctrl_2,
    vocoder.v_osc_dgws,
    0,
    vocoder.v_audio_in_hpf_gate,
    0,
    vocoder.v_portamento_time,
    vocoder.v_osc_level,
    vocoder.v_audio_in_level,
    vocoder.v_noise_level,
    vocoder.v_audio_in_hpf_level,
    vocoder.v_audio_in_gate_sense,
    vocoder.v_audio_in_threshold,
    vocoder.v_filter_shift,
    vocoder.v_filter_cutoff,
    vocoder.v_filter_resonance,
    vocoder.v_filter_mod_source,
    vocoder.v_filter_intensity,
    vocoder.v_filter_e_f_sense,
    vocoder.v_amp_level,
    vocoder.v_amp_direct_level,
    vocoder.v_amp_distortion,
    vocoder.v_amp_vel_sense,
    vocoder.v_amp_key_track,
    vocoder.v_eg_1_attack,
    vocoder.v_eg_1_decay,
    vocoder.v_eg_1_sustain,
    vocoder.v_eg_1_release,
    vocoder.v_eg_2_attack,
    vocoder.v_eg_2_decay,
    vocoder.v_eg_2_sustain,
    vocoder.v_eg_2_release,
    buildByte(
      { value: vocoder.v_lfo_1_key_sync, start: 4 },
      { value: vocoder.v_lfo_1_wave, start: 0 }
    ),
    vocoder.v_lfo_1_frequency,
    buildByte(
      { value: vocoder.v_lfo_1_tempo_sync, start: 7 },
      { value: vocoder.v_lfo_1_sync_note, start: 0 }
    ),
    buildByte(
      { value: vocoder.v_lfo_2_key_sync, start: 4 },
      { value: vocoder.v_lfo_2_wave, start: 0 }
    ),
    vocoder.v_lfo_2_frequency,
    buildByte(
      { value: vocoder.v_lfo_2_tempo_sync, start: 7 },
      { value: vocoder.v_lfo_2_sync_note, start: 0 }
    ),
    vocoder.v_level_1,
    vocoder.v_level_2,
    vocoder.v_level_3,
    vocoder.v_level_4,
    vocoder.v_level_5,
    vocoder.v_level_6,
    vocoder.v_level_7,
    vocoder.v_level_8,
    vocoder.v_pan_1,
    vocoder.v_pan_2,
    vocoder.v_pan_3,
    vocoder.v_pan_4,
    vocoder.v_pan_5,
    vocoder.v_pan_6,
    vocoder.v_pan_7,
    vocoder.v_pan_8,
  ];
  array.concat(Array(174).fill(0));
  return array;
}

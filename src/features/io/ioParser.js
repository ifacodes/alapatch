import { Parser } from 'binary-parser-encoder';

function parse(parser, binary) {
    // check if the binary is a valid KORG-produced SYSEX file
    if (binary.length !== 297) {
        throw new Error('incorrect file length');
    }
    if (binary[0] !== 0xf0) {
        throw new Error('first byte is not SYSEX byte');
    }
    if (binary[1] !== 0x42) {
        throw new Error('manufacturer code is not KORG');
    }
    if (binary[4] !== 0x40) {
        throw new Error('not a program dump');
    }
    if (binary[5] !== 0x00) {
        // in all files found in the wild it's always zero
        throw new Error('sixth byte is not zero');
    }
    if (binary[binary.length - 1] !== 0xf7) {
        throw new Error('last byte is does not end SYSEX message');
    }

    const trimmedBinary = binary.slice(5, -1);
    // every eigth byte is padding, so we remove it
    const unpaddedBinary = trimmedBinary.filter((_, idx) => idx % 8);

    const buffer = Buffer.from(
        Buffer.from(unpaddedBinary).toString('hex'),
        'hex'
    );

    console.log(parser.parse(buffer));

    // do stuff with the parsed object
}

const timbre = new Parser()
    .int8('midiChannel') // in 7 bits
    .bit2('assignMode')
    .bit1('eg2Reset')
    .bit1('eg1Reset')
    .bit1('triggerMode')
    .bit2('keyPriority')
    .uint8('unisonDetune')
    .uint8('pitchTune')
    .uint8('pitchBendRange')
    .uint8('pitchTranspose')
    .uint8('pitchVibratoInt')
    .uint8('osc1Wave')
    .uint8('osc1WaveCtrl1')
    .uint8('osc1WaveCtrl2')
    .uint8('osc1DWGSWave')
    .skip(1)
    .bit2('not-use1')
    .bit2('osc2ModSelect')
    .bit2('not-use2')
    .bit2('osc2Wave')
    .uint8('osc2Semitone')
    .uint8('osc2Tune')
    .bit1('not-use3')
    .bit7('portamentoTime')
    .uint8('osc1Level')
    .uint8('osc2Level')
    .uint8('noiseLevel')
    .uint8('filterType')
    .uint8('filterCutoff')
    .uint8('filterResonance')
    .uint8('filterEG1Intensity')
    .uint8('filterVelocitySense')
    .uint8('filterKeyboardTrack')
    .uint8('ampLevel')
    .uint8('ampPanpot')
    .bit1('not-use4')
    .bit1('ampSW')
    .bit5('not-use5')
    .bit1('ampDistortion')
    .uint8('ampVelocitySense')
    .uint8('ampKeyboardTrack')
    .uint8('eg1Attack')
    .uint8('eg1Decay')
    .uint8('eg1Sustain')
    .uint8('eg1Release')
    .uint8('eg2Attack')
    .uint8('eg2Decay')
    .uint8('eg2Sustain')
    .uint8('eg2Release')
    .bit2('not-use6')
    .bit2('lfo1KeySync')
    .bit2('not-use7')
    .bit2('lfo1Wave')
    .uint8('lfo1Freq')
    .bit1('lfo1TempoSync')
    .bit2('not-use8')
    .bit5('lfo1SyncNote')
    .bit2('not-use9')
    .bit2('lfo2KeySync')
    .bit2('not-use10')
    .bit2('lfo2Wave')
    .uint8('lfo2Freq')
    .bit1('lfo2TempoSync')
    .bit2('not-use11')
    .bit5('lfo2SyncNote')
    .bit4('patch1Dest')
    .bit4('patch1Src')
    .uint8('patch1Intensity')
    .bit4('patch2Dest')
    .bit4('patch2Src')
    .uint8('patch2Intensity')
    .bit4('patch3Dest')
    .bit4('patch3Src')
    .uint8('patch3Intensity')
    .bit4('patch4Dest')
    .bit4('patch4Src')
    .uint8('patch4Intensity');

const vocoder = new Parser()
    .int8('midiChannel') // in 7 bits
    .bit2('assignMode')
    .bit1('eg2Reset')
    .bit1('eg1Reset')
    .bit1('triggerMode')
    .bit2('keyPriority')
    .uint8('unisonDetune')
    .uint8('pitchTune')
    .uint8('pitchBendRange')
    .uint8('pitchTranspose')
    .uint8('pitchVibratoInt')
    .uint8('osc1Wave')
    .uint8('osc1WaveCtrl1')
    .uint8('osc1WaveCtrl2')
    .uint8('osc1DWGSWave')
    .skip(1) // dummy byte
    .bit7('not-use17')
    .bit1('HPF Gate')
    .skip(1)
    .bit1('not-use18')
    .bit7('portamentoTime')
    .uint8('osc1Level')
    .uint8('ext1Level')
    .uint8('noiseLevel')
    .uint8('hpfLevel')
    .uint8('gateSense')
    .uint8('threshold')
    .uint8('shift')
    .uint8('cutoff')
    .uint8('resonance')
    .uint8('modSource')
    .uint8('intensity')
    .uint8('efSense')
    .uint8('ampLevel')
    .uint8('ampDirectLevel')
    .bit7('not-use19')
    .bit1('ampDistortion')
    .uint8('velocitySense')
    .uint8('keyTrack')
    // always 0
    .uint8('eg1Attack')
    // always 0
    .uint8('eg1Decay')
    // always 127
    .uint8('eg1Sustain')
    // always 0
    .uint8('eg1Release')
    .uint8('eg2Attack')
    .uint8('eg2Decay')
    .uint8('eg2Sustain')
    .uint8('eg2Release')
    .bit2('not-use20')
    .bit2('lfo1KeySync')
    .bit2('not-use21')
    .bit2('lfo1Wave')
    .uint8('lfo1Freq')
    .bit1('lfo1TempoSync')
    .bit2('not-use22')
    .bit5('lfo1SyncNote')
    .bit2('not-use23')
    .bit2('lfo2KeySync')
    .bit2('not-use24')
    .bit2('lfo2Wave')
    .uint8('lfo2Freq')
    .bit1('lfo2TempoSync')
    .bit2('not-use25')
    .bit5('lfo2SyncNote')
    .array('levels', {
        type: 'uint8',
        length: 16,
    })
    .array('pans', {
        type: 'uint8',
        length: 16,
    })
    .array('efSenseLevels', {
        type: 'uint8',
        length: 16,
    });

const parser = new Parser()
    .endianess('big')
    .string('name', { encoding: 'ASCII', length: 12 })
    .skip(2)
    .bit5('not-use12')
    .bit3('arpTriggerLength')
    .bit8('arpTriggerPattern')
    .bit2('not-use13')
    .bit2('voiceMode')
    .bit4('not-use14')
    .bit4('scaleKey')
    .bit4('scaleType')
    .skip(1)
    .bit1('delayFxSync')
    .bit3('not-use15')
    .bit4('delayFXTimeBase')
    .uint8('delayFXDelayTime')
    .uint8('delayFXDepth')
    .uint8('delayFXType')
    .uint8('modFXLFOSpeed')
    .uint8('modFXDepth')
    .uint8('modFXType')
    .uint8('eqHiFreq')
    .uint8('eqHiGain')
    .uint8('eqLowFreq')
    .uint8('eqLowGain')
    .uint8('arpTempo')
    .uint8('arpSeqTempo')
    .bit1('arpOnOff')
    .bit1('arpLatchOnOff')
    .bit2('arpTarget')
    .bit1('not-use16')
    .bit1('arpKeySync')
    .bit4('arpRange')
    .bit4('arpType')
    .uint8('arpGateTime')
    .uint8('arpResolution')
    .uint8('arpSwing')
    .uint8('kbdOctave')
    .nest('timbre1', { type: timbre })
    // dummy bytes *see documentation
    .skip(56)
    .nest('timbre2', { type: timbre })
    // dummy bytes *see documentation
    .skip(56)
    .nest('vocoder', { type: vocoder })
    // dummy bytes *see documentation
    .skip(111);

// converts patch object to dump format the system uses
function serialise(parser, object) {
    console.log(parser.encode(object));
}

import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import FileIOComponent from "./components/FileIOComponent";
import MidiComponent from "./components/MidiComponent";
//import EditorComponent from "./components/EditorComponent";

import { Parser } from "binary-parser";

// converts SYSEX file to the dump format the system uses (and the implementation refers to)
function parse(binary) {
    // check if the binary is a valid KORG-produced SYSEX file
    if (binary.length !== 297) {
        throw new Error("incorrect file length");
    }
    if (binary[0] !== 0xf0) {
        throw new Error("first byte is not SYSEX byte");
    }
    if (binary[1] !== 0x42) {
        throw new Error("manufacturer code is not KORG");
    }
    if (binary[4] !== 0x40) {
        throw new Error("not a program dump");
    }
    if (binary[5] !== 0x00) {
        // in all files found in the wild it's always zero
        throw new Error("sixth byte is not zero");
    }
    if (binary[binary.length - 1] !== 0xf7) {
        throw new Error("last byte is does not end SYSEX message");
    }

    const trimmedBinary = binary.slice(5, -1);
    // every eigth byte is padding, so we remove it
    const unpaddedBinary = trimmedBinary.filter((el, idx) => idx % 8);

    const timbre = new Parser()
        .uint8("midiChannel") // in 7 bits
        .bit2("assignMode")
        .bit1("eg2Reset")
        .bit1("eg1Reset")
        .bit1("triggerMode")
        .bit2("keyPriority")
        .uint8("unisonDetune")
        .uint8("pitchTune")
        .uint8("pitchBendRange")
        .uint8("pitchTranspose")
        .uint8("pitchVibratoInt")
        .uint8("osc1Wave")
        .uint8("osc1WaveCtrl1")
        .uint8("osc1WaveCtrl2")
        .uint8("osc1DWGSWave")
        .seek(1)
        .bit2("ignore1")
        .bit2("osc2ModSelect")
        .bit2("ignore2")
        .bit2("osc2Wave")
        .uint8("osc2Semitone")
        .uint8("osc2Tune")
        .bit1("ignore3")
        .bit7("portamentoTime")
        .uint8("osc1Level")
        .uint8("osc2Level")
        .uint8("noiseLevel")
        .uint8("filterType")
        .uint8("filterCutoff")
        .uint8("filterResonance")
        .uint8("filterEG1Intensity")
        .uint8("filterVelocitySense")
        .uint8("filterKeyboardTrack")
        .uint8("ampLevel")
        .uint8("ampPanpot")
        .bit1("ignore4")
        .bit1("ampSW")
        .bit5("ignore5")
        .bit1("ampDistortion")
        .uint8("ampVelocitySense")
        .uint8("ampKeyboardTrack")
        .uint8("eg1Attack")
        .uint8("eg1Decay")
        .uint8("eg1Sustain")
        .uint8("eg1Release")
        .uint8("eg2Attack")
        .uint8("eg2Decay")
        .uint8("eg2Sustain")
        .uint8("eg2Release")
        .bit2("ignore6")
        .bit2("lfo1KeySync")
        .bit2("ignore7")
        .bit2("lfo1Wave")
        .uint8("lfo1Freq")
        .bit1("lfo1TempoSync")
        .bit2("ignore8")
        .bit5("lfo1SyncNote")
        .bit2("ignore9")
        .bit2("lfo2KeySync")
        .bit2("ignore10")
        .bit2("lfo2Wave")
        .uint8("lfo2Freq")
        .bit1("lfo2TempoSync")
        .bit2("ignore11")
        .bit5("lfo2SyncNote")
        .bit4("patch1Dest")
        .bit4("patch1Src")
        .uint8("patch1Intensity")
        .bit4("patch2Dest")
        .bit4("patch2Src")
        .uint8("patch2Intensity")
        .bit4("patch3Dest")
        .bit4("patch3Src")
        .uint8("patch3Intensity")
        .bit4("patch4Dest")
        .bit4("patch4Src")
        .uint8("patch4Intensity");

    const parser = new Parser()
        .endianess("big")
        .string("name", { encoding: "ASCII", length: 12 })
        .seek(2)
        .bit5("ignore12")
        .bit3("arpTriggerLength")
        .bit8("arpTriggerPattern")
        .bit2("ignore13")
        .bit2("voiceMode")
        .bit4("ignore14")
        .bit4("scaleKey")
        .bit4("scaleType")
        .seek(1)
        .bit1("delayFxSync")
        .bit3("ignore15")
        .bit4("delayFXTimeBase")
        .uint8("delayFXDelayTime")
        .uint8("delayFXDepth")
        .uint8("delayFXType")
        .uint8("modFXLFOSpeed")
        .uint8("modFXDepth")
        .uint8("modFXType")
        .uint8("eqHiFreq")
        .uint8("eqHiGain")
        .uint8("eqLowFreq")
        .uint8("eqLowGain")
        .uint8("arpTempo")
        .uint8("arpSeqTempo")
        .bit1("arpOnOff")
        .bit1("arpLatchOnOff")
        .bit2("arpTarget")
        .bit1("ignore16")
        .bit1("arpKeySync")
        .bit4("arpRange")
        .bit4("arpType")
        .uint8("arpGateTime")
        .uint8("arpResolution")
        .uint8("arpSwing")
        .uint8("kbdOctave")
        .nest("timbre1", { type: timbre })
        .seek(56)
        .nest("timbre2", { type: timbre })
        .seek(56);

    console.log(parser.parse(unpaddedBinary));
}

function PatchEditor() {
    const defaultPatch = {
        name: "",
        arpeggio: { length: 8, pattern: [0, 0, 0, 0, 0, 0, 0, 0] },
        arpeggio2: {
            tempo: 20,
            seq: 0,
            on: false,
            latch: false,
            target: 0,
            keySync: false,
            type: 0, // 0 - 5
            range: 0, // 0 - 4
            gate: 0, // 0 - 100
            resolution: 0,
            swing: 0,
        },
        voiceMode: 0,
        scaleKey: 0, // C
        scaleType: 0, // Equal Temperment
        delayFX: { sync: false, timeBase: 5, delayTime: 0, depth: 0, type: 0 },
        modFX: { lfoSpeed: 0, depth: 0, type: 0 },
        eq: { hiFreq: 0, hiGain: 0, lowFreq: 0, lowGain: 0 },
        octave: 0, // this is a 7 bit number so -1 is 127 and -3 is 125
        synthParameter1: {}, // only use this one in single voice mode
        synthParameter2: {}, // use this and the previous in multi voice mode
        synthParameter3: {}, // this is for vocoder mode
    };

    const [patch, setPatch] = useState(defaultPatch);

    return (
        <div>
            <FileIOComponent getBinaryData={parse} />
            {/*<EditorComponent />
            <MidiComponent />*/}
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    <PatchEditor />
                </div>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;

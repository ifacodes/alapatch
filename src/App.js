import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import FileIOComponent from "./components/FileIOComponent";
import MidiComponent from "./components/MidiComponent";
//import EditorComponent from "./components/EditorComponent";

import Parser from "packet";

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

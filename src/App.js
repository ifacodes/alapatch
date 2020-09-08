import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import FileIOComponent from "./components/FileIOComponent";
import MidiComponent from "./components/MidiComponent";
import EditorComponent from "./components/EditorComponent";

function PatchEditor() {
    const defaultPatch = {
        name: "",
        arpeggio: { length: 8, pattern: [0, 0, 0, 0, 0, 0, 0, 0] },
        arpeggio2: {},
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

    const [patch, updatePatch] = useState(defaultPatch);

    return (
        <div>
            <FileIOComponent />
            <EditorComponent />
            <MidiComponent />
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    <MidiComponent />
                </div>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;

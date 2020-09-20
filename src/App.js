import React, { useState } from "react";
import { Grommet, Box } from "grommet";
import css from "styled-components";
import "./App.css";

import FileIOComponent from "./components/FileIOComponent";
import MidiComponent from "./components/MidiComponent";
import EditorComponent from "./components/EditorComponent";

import { Parser } from "binary-parser";

const theme = {
    "name": "my theme",
    "rounding": 4,
    "spacing": 12,
    "defaultMode": "light",
    "global": {
        "colors": {
            "brand": {
                "dark": "#7700cc",
                "light": "#6600cc",
            },
            "background": {
                "dark": "#111111",
                "light": "#FFFFFF",
            },
            "background-back": {
                "dark": "#111111",
                "light": "#EEEEEE",
            },
            "background-front": {
                "dark": "#222222",
                "light": "#FFFFFF",
            },
            "background-contrast": {
                "dark": "#FFFFFF11",
                "light": "#11111111",
            },
            "text": {
                "dark": "#EEEEEE",
                "light": "#333333",
            },
            "text-strong": {
                "dark": "#FFFFFF",
                "light": "#000000",
            },
            "text-weak": {
                dark: "#CCCCCC",
                light: "#444444",
            },
            "text-xweak": {
                dark: "#999999",
                light: "#666666",
            },
            border: {
                dark: "#444444",
                light: "#CCCCCC",
            },
            "control": "brand",
            "active-background": "background-contrast",
            "active-text": "text-strong",
            "selected-background": "brand",
            "selected-text": "text-strong",
            "status-critical": "#FF4040",
            "status-warning": "#FFAA15",
            "status-ok": "#00C781",
            "status-unknown": "#CCCCCC",
            "status-disabled": "#CCCCCC",
            "graph-0": "brand",
            "graph-1": "status-warning",
        },
        font: {
            family: "Fira Mono",
        },
        active: {
            background: "active-background",
            color: "active-text",
        },
        hover: {
            background: "active-background",
            color: "active-text",
        },
        selected: {
            background: "selected-background",
            color: "selected-text",
        },
        focus: {
            outline: {
                size: "0",
            },
            shadow: {
                size: 0,
            },
        },
    },
    tab: {
        background: {
            color: "light-1",
        },
        color: "dark",
        border: undefined,
        active: {
            background: "brand",
            color: "white",
        },
        hover: {
            background: "brand",
            color: "white",
        },
        pad: "small",
        extend: () =>
            `
                transition: background 0.5s ease, color 0.5s ease;
                border-radius: 4px;
                box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
            `,
    },
    tabs: {
        header: {
            background: "dark-1",
            extend: () => `
                padding: 10px;
            `,
        },
        background: "light-3",
    },
    chart: {},
    diagram: {
        line: {},
    },
    meter: {},
};

// converts SYSEX file to the dump format the system uses (and the implementation refers to)
function parse(parser, binary) {
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

    // make a vocoder timbre instead of ignoring it LMAO
    const buffer = Buffer.from(
        Buffer.from(unpaddedBinary).toString("hex"),
        "hex"
    );

    console.log(parser.parse(buffer));

    // do stuff with the parsed object
}

// converts patch object to dump format the system uses
function serialise(parser, object) {
    console.log(parser.encode(object));
}

function PatchEditor() {
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
        .skip(1)
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

    const vocoder = new Parser()
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
        .skip(1);

    const parser = new Parser()
        .endianess("big")
        .string("name", { encoding: "ASCII", length: 12 })
        .skip(2)
        .bit5("ignore12")
        .bit3("arpTriggerLength")
        .bit8("arpTriggerPattern")
        .bit2("ignore13")
        .bit2("voiceMode")
        .bit4("ignore14")
        .bit4("scaleKey")
        .bit4("scaleType")
        .skip(1)
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
        .skip(56)
        .nest("timbre2", { type: timbre })
        .skip(56);

    const [patch, setPatch] = useState();

    const toParse = (binary) => {
        setPatch(parse(parser, binary));
    };

    const toSerialise = (object) => {
        serialise(parser, object);
    };

    return (
        <div className="patch-editor">
            <FileIOComponent getBinaryData={toParse} />
            <EditorComponent />
            {/*<MidiComponent />*/}
        </div>
    );
}

function App() {
    return (
        <Grommet theme={theme}>
            <PatchEditor />
        </Grommet>
    );
}

export default App;

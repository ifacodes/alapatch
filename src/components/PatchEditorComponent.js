import React, { useState, useEffect } from "react";

function PatchEditorComponent() {
    const defaultPatch = {
        name: "",
        arpeggio: { length: 8, pattern: [0, 0, 0, 0, 0, 0, 0, 0] },
        voiceMode: 0,
        scaleKey: 0, // C
        scaleType: 0, // Equal Temperment
        delayFX: { sync: false, timeBase: 5, delayTime: 0, depth: 0, type: 0 },
        modFX: { lfoSpeed: 0, depth: 0, type: 0 },
        eq: { hiFreq: 0, hiGain: 0, lowFreq: 0, lowGain: 0 },
        arpeggio2: {},
        octave: 0, //this is a 7 bit number so -1 is 127 and -3 is 125
        synthParameter1: {}, // only use this one in single voice mode
        synthParameter2: {}, // use this and the previous in multi voice mode
        synthParameter3: {}, // this is for vocoder mode
    };

    const [patch, updatePatch] = useState(defaultPatch);

    useEffect(
        {
            // update the dump and send out a sysex message to the system
        },
        [patch]
    );

    return (
        // placeholder div
        <div></div>
    );
}

export default PatchEditorComponent;

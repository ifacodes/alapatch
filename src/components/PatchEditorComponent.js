import React, { useState, useEffect } from "react";
import { NameInput } from "./InputComponents.js";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import { deepPurple } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[400],
        },
        secondary: {},
    },
});

function PatchEditorComponent(props) {
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

    useEffect(() => {
        // update the dump and send out a sysex message to the system
        console.log(patch);
    }, [patch]);

    if (!props.show) {
        return null;
    }

    return (
        // placeholder div
        <ThemeProvider theme={theme}>
            <Box bgcolor="primary">
                <NameInput
                    returnName={(name) => {
                        let copyPatch = JSON.parse(JSON.stringify(patch));
                        copyPatch.name = name;
                        updatePatch(copyPatch);
                    }}
                />
            </Box>
        </ThemeProvider>
    );
}

export default PatchEditorComponent;

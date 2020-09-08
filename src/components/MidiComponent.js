import React, { useState, useEffect } from "react";

// this will pass true to enable SYSEX

// Success Callback
function onMIDISuccess(access) {
    console.log(access);

    //var inputs = access.inputs;
    //var outputs = access.outputs;
}

//Failure Callback
function onMIDIFailure() {
    console.log("Could not access MIDI devices!");
}

// function recieveMIDIMessage(message) {
//     console.log(message);
// }

// Component to load a SYSEX File into the MIDI component

function MIDIComponent() {
    const [loadedFile, loadFile] = useState(null);

    // request midi access
    useEffect(() => {
        navigator
            .requestMIDIAccess({ sysex: true })
            .then(onMIDISuccess, onMIDIFailure);
    }, []);

    useEffect(() => {
        console.log(loadedFile);
    }, [loadedFile]);

    const getChildFile = (childData) => {
        loadFile(childData);
    };

    return; //<LoadSYSEXFile sendFileData={getChildFile} />;
}

export default MIDIComponent;

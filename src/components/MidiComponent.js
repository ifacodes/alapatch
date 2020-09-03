import React from 'react';
import { render } from '@testing-library/react';

// this will pass true to enable SYSEX

// Success Callback
function onMIDISuccess(access) {
    console.log(access);

    var inputs = access.inputs;
    var outputs = access.outputs;
}

//Failure Callback
function onMIDIFailure() {
    console.log('Could not access MIDI devices!');
}

function recieveMIDIMessage(message) {
    
}

function loadSysex(input) {
    let file = input.current.files[0];
    console.log(file);
}

function dumpBufferfromSysexFile() {
    
}

function MIDIComponent () {
    
    navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure);
    const fileInput = React.useRef();

    const handleInput = (event) => {
        event.preventDefault();
        loadSysex(fileInput);
    }

    return(
        <form onSubmit={handleInput}>
            <label>
                Upload a Sysex File:
                <input type='file' ref={fileInput} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );


}

export default MIDIComponent;
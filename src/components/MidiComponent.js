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

function MIDIComponent () {
    
    navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure);
    const fileInput = React.useRef();

    const handleInput = (event) => {
        event.preventDefault();
        alert(
            `Selected file - ${fileInput.current.files[0].name}`
        );
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

function parseSysexFile() {

}

export default MIDIComponent;
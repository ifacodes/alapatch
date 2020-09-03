import React from 'react';

// this will pass true to enable SYSEX

// Success Callback
function onMIDISuccess(access) {
    console.log(access);

    //var inputs = access.inputs;
    //var outputs = access.outputs;
}

//Failure Callback
function onMIDIFailure() {
    console.log('Could not access MIDI devices!');
}

function recieveMIDIMessage(message) {
    console.log(message);
}

function isValidSysex(data) {
    if (data.length !== 297) {
        console.log("incorrect file length");
        return false;
    }
    if (data[0] !== 0xF0) {
        console.log("first byte is not SYSEX byte");
        return false;
    }
    if (data[1] !== 0x42) {
        console.log("manufacturer code is not KORG");
        return false;
    }
    if (data[data.length-1] !== 0xF7) {
        console.log("last byte is does not end SYSEX message");
        return false;
    }
    if (data[4] !== 0x40) {
        console.log("not a program dump")
        return false;
    }

    return true;
}

function loadSysex(input) {
    let file = input.current.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.onload = (e) => {
        let data = new Uint8ClampedArray(e.target.result)
        console.log(data);
        if (isValidSysex(data)) {
            console.log("read in as valid sysex file");
            return data;
        }
        else {
            console.log("could not verify sysex");
            return null;
        }
    }
    reader.readAsArrayBuffer(file);
}

function dumpBufferFromSysexFile(array) {
    // remove the header and footer bytes
    let dump = array.slice(5, -1);
    console.log(dump);
    // quick test for verification;
    if (dump[0] !== 0x00) {
        console.log("incorrect byte");
        return;
    }
    console.log(dump);
    dump = dump.filter(
        function(num, index, array) {
            return index % 8;
        }
    );
    console.log(dump);
}

function MIDIComponent () {

    // request midi access
    navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure);
    const fileInput = React.useRef();

    // on file load, verify correct file format
    const getFile = (event) => {
        event.preventDefault();
        loadSysex(fileInput);
        // enable the submit button
    }

    // on submit button press, convert the file to correct Dump Format, as per microKORG MIDI Implementation Doc
    const handleInput = (event) => {
        event.preventDefault();
        /*if (sysexFile == null) {
            alert("Please load a SYSEX File");
            return;
        }*/
        let reader = new FileReader();
        reader.onload = (e) => {
            let data = new Uint8ClampedArray(e.target.result);
            dumpBufferFromSysexFile(data);
        }
        reader.readAsArrayBuffer(fileInput.current.files[0]);
    }

    return(
        <form onSubmit={handleInput}>
            <label>
                Upload a Sysex File:
                <input type='file' ref={fileInput} onChange={getFile}/>
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );


}

export default MIDIComponent;
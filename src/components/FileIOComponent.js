import React, { useState, useEffect } from "React";

function isValidSysex(data) {
    if (data.length !== 297) {
        console.log("incorrect file length");
        return false;
    }
    if (data[0] !== 0xf0) {
        console.log("first byte is not SYSEX byte");
        return false;
    }
    if (data[1] !== 0x42) {
        console.log("manufacturer code is not KORG");
        return false;
    }
    if (data[data.length - 1] !== 0xf7) {
        console.log("last byte is does not end SYSEX message");
        return false;
    }
    if (data[4] !== 0x40) {
        console.log("not a program dump");
        return false;
    }

    return true;
}

function loadSysex(input) {
    let file = input.current.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.onload = (e) => {
        let data = new Uint8ClampedArray(e.target.result);
        console.log(data);
        if (isValidSysex(data)) {
            console.log("read in as valid sysex file");
            return data;
        } else {
            console.log("could not verify sysex");
            return null;
        }
    };
    reader.readAsArrayBuffer(file);
}

// converts SYSEX file to the dump format the system uses (and the implementation refers to)
function dumpBufferFromSysexFile(array) {
    // remove the header and footer bytes
    let dump = array.slice(5, -1);
    // quick test for verification;
    if (dump[0] !== 0x00) {
        console.log("incorrect byte");
        return;
    }
    console.log("trimmed file", dump);
    // convert from 291 bytes to 254 (ala the implementation)
    dump = dump.filter(function (num, index, array) {
        return index % 8;
    });
    console.log("dump format", dump);
    return dump;
}

function LoadSYSEXFile(props) {
    const fileInput = React.useRef();
    const [data, updateData] = useState(new Uint8ClampedArray());

    // make sure data is updating correctly
    useEffect(() => {
        console.log(data);
    }, [data]);

    // on file load, verify correct file format
    const getFile = (event) => {
        event.preventDefault();
        if (loadSysex(fileInput) !== null) {
            let reader = new FileReader();
            reader.onload = (e) => {
                // here we load the file into a clamped byte array and trim and convert it to the dump format (see implementation)
                let l_data = new Uint8ClampedArray(e.target.result);
                // updata state with dump format
                updateData(dumpBufferFromSysexFile(l_data));
            };
            reader.readAsArrayBuffer(fileInput.current.files[0]);
        } else {
            alert("Please load a SYSEX File");
            return null;
        }
    };

    // on submit button press, pass the file to the parent component
    const handleInput = (event) => {
        event.preventDefault();
        if (fileLoaded()) {
            props.sendFileData(data);
        }
    };

    const fileLoaded = () => {
        console.log(data.length);
        return data.length === 254;
    };

    return (
        <form onSubmit={handleInput}>
            <label>
                Upload a Sysex File:
                <input type="file" ref={fileInput} onChange={getFile} />
            </label>
            <br />
            <button disabled={!fileLoaded()} type="submit">
                Submit
            </button>
        </form>
    );
}

export default LoadSYSEXFile;

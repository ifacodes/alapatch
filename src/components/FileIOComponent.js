import React, { useState, useEffect } from "react";

function FileIOComponent(props) {
    const fileInput = React.useRef();

    // on file load, verify correct file format
    const getFile = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        reader.onload = (e) => {
            props.getBinaryData(new Uint8Array(e.target.result));
        };
        reader.readAsArrayBuffer(fileInput.current.files[0]);
    };

    // on submit button press, pass the file to the parent component

    return (
        <form>
            <label>
                Upload a Sysex File:
                <input type="file" ref={fileInput} onChange={getFile} />
            </label>
        </form>
    );
}

export default FileIOComponent;

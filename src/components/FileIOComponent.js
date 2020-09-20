import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Form = styled.form`
    position: absolute;
    padding: 25px;
`;

const StyledLabel = styled.label`
    color: #333333;
    cursor: pointer;
    background: #ffffff;
    padding: 12px;
    border-radius: 4px;
    transition: background 0.25s ease, color 0.25s ease;
    &:hover {
        background: #6600cc;
        color: #eeeeee;
    }
`;

function FileIOComponent(props) {
    const fileInput = React.useRef(null);
    const [text, setText] = useState("Upload a Sysex File");
    // on file load, verify correct file format
    const getFile = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        reader.onload = (e) => {
            setText("File Loaded");
            props.getBinaryData(new Uint8Array(e.target.result));
        };
        reader.readAsArrayBuffer(fileInput.current.files[0]);
    };

    // on submit button press, pass the file to the parent component

    return (
        <Form>
            <StyledLabel htmlFor="file">
                {fileInput.current !== null ? text : "Upload a Sysex File"}
            </StyledLabel>
            <input
                style={{
                    width: "0.1px",
                    height: "0.1px",
                    opacity: 0,
                    overflow: "hidden",
                    position: "absolute",
                    zIndex: "-1",
                }}
                name="file"
                type="file"
                id="file"
                ref={fileInput}
                onChange={getFile}
            />
        </Form>
    );
}

export default FileIOComponent;

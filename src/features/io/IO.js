import React, { useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Parse } from './ioParser';
import './IO.css';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '4.25em',
    padding: '0.5em',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'slategrey',
    borderStyle: 'dashed',
    backgroundColor: 'ghostwhite',
    color: 'slategray',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const activeStyle = {
    borderColor: 'slateblue',
};

const acceptStyle = {
    borderColor: 'mediumseagreen',
};

const rejectStyle = {
    borderColor: 'crimson',
};

const Dropzone = ({ setFile }) => {
    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject,
    } = useDropzone({
        multiple: false,
        maxFiles: 1,
        noKeyboard: true,
        onDrop: (files) => setFile(files[0]),
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    return (
        <div className='dropzone-container'>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag and drop file here, or click to select</p>
            </div>
        </div>
    );
};

export default function IO() {
    const [file, setFile] = useState(null);
    const reader = new FileReader();

    // turn file into array buffer for parsing
    const fileToArrayBuffer = (f) => {
        reader.onload = (e) => {
            setFile(new Uint8Array(e.target.result));
        };
        reader.readAsArrayBuffer(f);
    };

    useEffect(() => {
        if (file) {
            console.log(Parse(file));
        }
    });

    return (
        <div className='dropzone-container'>
            <Dropzone className='dropzone-modal' setFile={fileToArrayBuffer} />
        </div>
    );
}

/* TODO -- possibly add clicking outside the modal to close it*/

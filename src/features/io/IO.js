import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone(props) {
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        noKeyboard: true,
    });

    return (
        <div className="container">
            <div {...getRootProps}>
                <input {...getInputProps} />
                <p>Drag and drop files here</p>
                <button type="button" onClick={open}>
                    Open File
                </button>
            </div>
        </div>
    );
}

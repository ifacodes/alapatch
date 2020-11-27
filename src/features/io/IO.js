import React, { useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const activeStyle = {
    borderColor: '#2196f3',
};

const acceptStyle = {
    borderColor: '#00e676',
};

const rejectStyle = {
    borderColor: '#ff1744',
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
        <section className="dropzone-container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag and drop file here, or click to select</p>
            </div>
        </section>
    );
};

export default function IO(props) {
    const [file, setFile] = useState(null);

    useEffect(() => {
        console.log(file);
    });

    return (
        <div className="io">
            <Dropzone className="dropzone-modal" setFile={setFile} />
        </div>
    );
}

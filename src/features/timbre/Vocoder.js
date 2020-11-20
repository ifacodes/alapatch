import React from 'react';
import { useSelector } from 'react-redux';
import { selectById } from './timbreSlice';

export default function Vocoder(props) {
    const ids = useSelector((state) => selectById(state, props.id));
    return <div></div>;
}
